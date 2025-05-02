import AuthUserDto from "@/domain/dtos/auth/user";
import SearchTermRequest from "./search-request";
import { InternalError } from "@/shared/errors/internal-error";
import { BadRequestError } from "@/shared/errors/bad-request-error";
import { ISearchTermUseCase } from "@/application/interfaces/use-cases/search-usecase-interface";
import { IIndexerAdapter } from "@/application/interfaces/adapters/indexer-adapter";
import { SearchTermResponse } from "./search-response";
import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import IDocumentRepository from "@/application/interfaces/repositories/document";
import { SearchResultDto, SearchTermDto } from "@/domain/dtos/search-dtos";

export default class SearchTermUseCase implements ISearchTermUseCase {
  public currentUser?: AuthUserDto;

  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly repository: IDocumentRepository,
    readonly indexerAdapter: IIndexerAdapter,
    readonly indexName: string,
  ) {}

  /**
   * Handles the create document request.
   *
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                      It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing search term and mode.
   * @returns A promise that resolves search result.
   */

  async handler(
    currentUser: AuthUserDto,
    request: SearchTermRequest,
  ): Promise<SearchTermResponse | Error> {
    this.currentUser = currentUser;
    // Validations
    if (!request.term || request.term.length === 0) {
      return new BadRequestError("Search term is required.");
    }

    if (
      request.documentId &&
      request.mode == "page" &&
      request.documentId <= 0
    ) {
      return new BadRequestError("Document id is required.");
    }

    if (request.documentId && request.mode == "document") {
      return new BadRequestError(
        "Document is not required when mode is 'document' due all document will be searched.",
      );
    }

    let result: SearchResultDto[] = [];
    const filter: SearchTermDto = {
      documentId: request.mode == "page" ? request.documentId : undefined,
      term: request.term,
    };

    try {
      result = await this.indexerAdapter.searchByTerm(this.indexName, filter);
    } catch (error) {
      const errorMsg = `Error to search ${
        request.mode == "document"
          ? "term on pages from"
          : "term on all documents."
      }`;

      console.error(errorMsg, error);

      return new InternalError(errorMsg);
    }

    return {
      success: true,
      message:
        result.length > 0
          ? `${result.length} record(s) found.`
          : "Empty result.",
      result,
    };
  }
  catch(error: any) {
    console.error("Uknow error searching document:", error);
    return new InternalError("Uknow error occurred while searching document.");
  }
}
