import DocumentDto from "@/domain/dtos/document";
import IBaseUseCaseResponse from "@/application/interfaces/base/base-usecase-response";

export class UpdateDocumentResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new CreateDocumentResponse object.
   * 
   * @param success - Indicates whether the document creation operation was successful.
   * @param message - Provides a message related to the operation result, typically used for conveying success or error information.
   * @param document - The retrieved document data transfer object (DTO) document. This will be null if is found or any error.
   */
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly document?: DocumentDto
  ) { }
}
