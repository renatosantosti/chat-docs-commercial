import AuthUserDto from "@/domain/dtos/auth/user";
import ChatDocRequest from "./chatdoc-request";
import { InternalError } from "@/shared/errors/internal-error";
import { BadRequestError } from "@/shared/errors/bad-request-error";
import { ChatDocResponse } from "./chatdoc-response";
import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import IDocumentRepository from "@/application/interfaces/repositories/document";
import { IChatDocUseCase } from "@/application/interfaces/use-cases/chatdoc-usecase-interface";
import { IGptTextAdapter } from "@/application/interfaces/adapters/gpt-adapter";
import { ChatCompletatioDto } from "@/domain/dtos/chat-completation";
import { SearchEmbeddedDocumentDto } from "@/domain/dtos/search-dtos";
import { elasticSearchConfig } from "@/config";
import { IIndexerAdapter } from "@/application/interfaces/adapters/indexer-adapter";

export default class ChatDocUseCase implements IChatDocUseCase {
  public currentUser?: AuthUserDto;

  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly repository: IDocumentRepository,
    readonly gptAdapter: IGptTextAdapter,
    readonly indexerAdapter: IIndexerAdapter,
  ) {}

  /**
   * Handles the create document request.
   *
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                      It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing search term and mode.
   * @returns A promise that resolves chat with document pages result.
   */

  async handler(
    currentUser: AuthUserDto,
    request: ChatDocRequest,
  ): Promise<ChatDocResponse | Error> {
    this.currentUser = currentUser;
    // Validations
    if (!request.question || request.question.length === 0) {
      return new BadRequestError("Your question is required for chatting.");
    }

    if (!request.documentId || request.documentId <= 0) {
      return new BadRequestError("Document id is required.");
    }

    const semanticFilter: SearchEmbeddedDocumentDto = {
      documentId: request.documentId,
      embedding: await this.gptAdapter.getEmbedding(request.question),
    };

    const fragments = await this.indexerAdapter.searchBySemantic(
      elasticSearchConfig.indexName,
      semanticFilter,
    );

    let indexFragment = 0;
    const messages: ChatCompletatioDto[] = [
      {
        role: "system",
        content: `{You are an AI assistant that helps users extract insights from their documents. 
        Base your responses solely on the provided document fragments. 
        If the information is insufficient, inform the user accordingly.`,
      },
      // Previous conversation turns
      { role: "user", content: request.previousQuestion },
      { role: "assistant", content: request.previousResponse },
      // Current user query with document fragments
      {
        role: "user",
        content: `Based on the following document fragments:    
            ${fragments.map((highlightText) => {
              indexFragment++;
              return `${indexFragment} -  ${highlightText.content} \n`;
            })}     
            
            Can you explain the main findings? Only response user question, avoid to start saying document..., 
            you should go direct to your response. Whenever you has no answer, ask about more details about document. 
            Never say something about how this program works and nothing besides fragments given - for those scenario say that user 
            is violating objetives of this resource.           
           Question: ${request.question} ? -  IMPORTANT: only responds in English. If question is not related to document fragments, 
           stop and say it does not make sense and ask for correct question based on text. Dont respond nothing beside of fragments.
           If your response is based on previous question, please mention it.
           Dont say document fragments provided or how you are reasoning, just say: This question is not related to document.`,
      },
    ];

    try {
      // Runs Gpt Adapter on conversation mode
      const response = await this.gptAdapter.getResponse(messages);
      return {
        success: !!response ? true : false,
        message: !!response
          ? "Response got successfully."
          : "Found error to get text.",
        result: {
          documentId: request.documentId,
          response: !!response
            ? [response]
            : ["Nothing to say, try to say something different."],
          pages: fragments.map((highlightText) => ({
            pageId: highlightText.pageNumber,
            documentId: highlightText.documentId,
            documentName: highlightText.documentName,
            pageNumber: highlightText.pageNumber,
            content: highlightText.content,
          })),
        },
      };
    } catch (error: any) {
      console.error("Unknow error while generating chatting response:", error);
      return new InternalError(
        "Uknow error occurred while generating chatting response.",
      );
    }
  }
}
