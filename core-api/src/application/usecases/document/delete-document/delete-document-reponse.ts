import IBaseUseCaseResponse from "@/application/interfaces/base/base-usecase-response";

/**
 * Response object for the create document operation.
 * This object encapsulates the result of the document creation process, implementing the base response structure.
 */
export default class DeleteDocumentResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new CreateDocumentResponse object.
   * 
   * @param success - Indicates whether the document creation operation was successful.
   * @param message - Provides a message related to the operation result, typically used for conveying success or error information.
   */
  constructor(
    readonly success: boolean,
    readonly message: string
  ) { }
}
