import DocumentDto from "@/domain/dtos/document";
import IBaseUseCaseResponse from "@/application/interfaces/base/base-usecase-response";

/**
 * Response object for the create document operation.
 * This object encapsulates the result of the document creation process, implementing the base response structure.
 */
export default class GetDocumentResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new CreateDocumentResponse object.
   *
   * @param success - Indicates whether the document creation operation was successful.
   * @param message - Provides a message related to the operation result, typically used for conveying success or error information.
   * @param Document - The retrieved document data transfer object (DTO) document. This will be null if found any error.
   */
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly document?: DocumentDto | null,
  ) {}
}
