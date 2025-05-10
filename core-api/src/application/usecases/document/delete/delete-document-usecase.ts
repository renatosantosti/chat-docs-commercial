import AuthUserDto from "@/domain/dtos/auth/user";
import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import IDocumentRepository from "@/application/interfaces/repositories/document";
import IBaseMapper from "@/application/interfaces/base/base-mapper";
import DocumentDto from "@/domain/dtos/document";
import Document from "@/domain/models/document";
import DeleteDocumentRequest from "../../../interfaces/use-cases/document/delete/delete-document-request";
import DeleteDocumentResponse from "../../../interfaces/use-cases/document/delete/delete-document-reponse";
import { AccessForbiddenError } from "@/shared/errors/access-forbidden-error";
import { InternalError } from "@/shared/errors/internal-error";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { IDeleteDocumentUseCase } from "@/application/interfaces/use-cases/document/delete/delete-document-usecase-interface";

/**
 * Use case for creating a new document.
 * This class handles the logic for creating a new document in the system.
 * It implements the IBaseUseCaseHandler interface to adhere to a standard request-response pattern.
 */
export default class DeleteDocumentUseCase implements IDeleteDocumentUseCase {
  public currentUser?: AuthUserDto;
  /**
   * Constructs a new DeleteDocumentUseCase.
   *
   * @param currentUser - The currently authenticated user.
   * @param timeProvider - The time provider used for obtaining the current UTC datetime.
   * @param mapper - Helper to map document model to DTO.
   */
  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly repository: IDocumentRepository,
    readonly mapper: IBaseMapper<Document, DocumentDto>,
  ) {}

  /**
   * Handles the create document request.
   *
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing the data needed to create a new document.
   * @returns A promise that resolves to a DeleteDocumentResponse object containing the result of the document creation process.
   */
  async handler(
    currentUser: AuthUserDto,
    request: DeleteDocumentRequest,
  ): Promise<DeleteDocumentResponse | Error> {
    this.currentUser = currentUser;

    let document = null;
    try {
      // Fetch the document by ID
      document = await this.repository.getOneById(request.id);
      if (!document) {
        throw new NotFoundError();
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw new InternalError("An error occurred while fetching the document.");
    }

    // Check if the user has permission to view the requested document
    if (this.currentUser.id !== document.userId) {
      return new AccessForbiddenError();
    }

    try {
      const result = await this.repository.deleteOneById(request.id);

      return {
        success: !!result,
        message: result
          ? "User deleted successfully."
          : "Unknow error to delete document.",
      };
    } catch (err: any) {
      console.error("Error deleting document:", err);
      throw new InternalError("An error occurred while deleting the document.");
    }
  }
}
