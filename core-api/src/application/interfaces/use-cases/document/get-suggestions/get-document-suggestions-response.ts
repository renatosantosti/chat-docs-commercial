import IBaseUseCaseResponse from "@/application/interfaces/base/base-usecase-response";
import DocumentSuggestionDto from "@/domain/dtos/document-sugestion";

/**
 * Response object for the document suggestion retrieval operation.
 * This object encapsulates the result of the document suggestion retrieval process, implementing the base response structure.
 */
export class GetDocumentSuggestionsResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new GetDocumentSuggestionsResponse object.
   * @param success Indicates if the operation was successful.
   * @param message A message providing additional information about the operation.
   * @param suggestions An array of document suggestions or empty array if none were found.
   */
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly suggestions: DocumentSuggestionDto[],
  ) {}
}
