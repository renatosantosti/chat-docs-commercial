import IBaseUseCaseResponse from "@/application/interfaces/base/base-usecase-response";
import DocumentDto from "../../../../domain/dtos/document";

/**
 * Response object for the create document operation.
 * This object encapsulates the result of the document creation process, implementing the base response structure.
 */
export default class GetAllDocumentResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new CreateDocumentResponse object.
   *
   * @param success - Indicates whether the document creation operation was successful.
   * @param message - Provides a message related to the operation result, typically used for conveying success or error information.
   * @param documents - An array of DocumentDto objects representing the created document(s).
   *                  This property is null if the operation was not successful or if no documents were created.
   */
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly documents: DocumentDto[] | null,
  ) {}
}
