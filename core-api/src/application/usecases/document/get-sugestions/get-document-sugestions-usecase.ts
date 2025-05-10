import { IGptTextAdapter } from "@/application/interfaces/adapters/gpt-adapter";
import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import GetDocumentSuggestionsRequest from "@/application/interfaces/use-cases/document/get-suggestions/get-document-suggestions-request";
import { GetDocumentSuggestionsResponse } from "@/application/interfaces/use-cases/document/get-suggestions/get-document-suggestions-response";
import { IGetDocumentSuggestionsUseCase } from "@/application/interfaces/use-cases/document/get-suggestions/get-document-suggestions-usecase-interface";
import { ChatCompletatioDto } from "@/domain/dtos/chat-completation";
import { BadRequestError } from "@/shared/errors";

export class GetDocumentSuggestionsUseCase
  implements IGetDocumentSuggestionsUseCase
{
  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly gptAdapter: IGptTextAdapter,
  ) {}

  async handler(
    request: GetDocumentSuggestionsRequest,
  ): Promise<GetDocumentSuggestionsResponse | Error> {
    // Validations
    if (!request.fileName) {
      return new BadRequestError("File name is required.");
    }

    if (!request.contentSample) {
      return new BadRequestError("Content sample is required.");
    }

    if (request.contentSample.length > 1000) {
      return new BadRequestError(
        "Content sample must not exceed 1000 characters.",
      );
    }

    const messages: ChatCompletatioDto[] = [
      {
        role: "system",
        content: `You are an AI assistant that generates helpful suggestions for document titles and descriptions.
                                    - Your task is to suggest between 3 and 5 pairs of {title, description}.
                                    - Each pair should be concise, relevant, and based on the content sample provided.
                                    - If the document name is vague or unhelpful, rely solely on the content sample.
                                    - Your response must be a JSON array with this structure: [{"title": "Suggested Title", "description": "Suggested Description"}, ...]
                                    - Do not include any explanations, introductions, or extra text—just the JSON array.`,
      },
      {
        role: "user",
        content: `Based on the following document name: ${request.fileName}
                                                  And the following content sample: ${request.contentSample}  
                                                  Generate 3 to 5 title and description suggestions.`,
      },
    ];

    // Runs Gpt Adapter on conversation mode
    console.log("Messages to GptAdapter:", messages);
    const rawResponse = await this.gptAdapter.getResponse(messages);
    console.log("Raw response from GptAdapter:", rawResponse);

    try {
      const parsed = JSON.parse(rawResponse ?? "");
      if (this.isValidSuggestionArray(parsed)) {
        const suggestions = parsed;
        return {
          success: true,
          message: "Response got successfully.",
          suggestions: suggestions,
        };
      } else {
        console.error(
          "Invalid response format. Expected an array of objects with title and description.",
        );

        return new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error to get suggestions from GptProvider:", error);
      return new Error("Failed to get suggestions due to an internal error.");
    }
  }

  private isValidSuggestionArray(
    data: any,
  ): data is { title: string; description: string }[] {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item.title === "string" &&
          typeof item.description === "string",
      )
    );
  }
}
