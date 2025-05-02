import AuthUserDto from "@/domain/dtos/auth/user";
import { IGetDocumentUseCase } from "../../../interfaces/use-cases/get-document-usecase-interface";
import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import IDocumentRepository from "@/application/interfaces/repositories/document";
import IBaseMapper from "@/application/interfaces/base/base-mapper";
import DocumentDto from "@/domain/dtos/document";
import Document from "@/domain/models/document";
import GetDocumentRequest from "./get-document-request";
import GetDocumentResponse from "./get-document-response";
import { InternalError } from "@/shared/errors/internal-error";
import { AccessForbiddenError } from "@/shared/errors/access-forbidden-error";
import { NotFoundError } from "@/shared/errors/not-found-error";

/**
 * Use case for creating a new document.
 * This class handles the logic for creating a new document in the system.
 * It implements the IBaseUseCaseHandler interface to adhere to a standard request-response pattern.
 */
export default class GetDocumentUseCase implements IGetDocumentUseCase {
  public currentUser?: AuthUserDto;

  /**
   * Constructs a new GetDocumentUseCase.
   *
   * @param timeProvider - The time provider used for obtaining the current UTC datetime.
   * @param repository - The document repository used for data access.
   * @param mapper - Helper to map document model to DTO.
   */
  constructor(
    readonly timeProvider: ITimeAdapter,
    readonly repository: IDocumentRepository,
    readonly mapper: IBaseMapper<Document, DocumentDto>,
  ) {}

  /**
   * Handles the get document request.
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing the data needed to get a new document.
   * @returns A promise that resolves to a GetDocumentResponse object containing the result of the document creation process.
   */
  async handler(
    currentUser: AuthUserDto,
    request: GetDocumentRequest,
  ): Promise<GetDocumentResponse | Error> {
    this.currentUser = currentUser;

    let document = null;
    try {
      // Fetch the document by ID
      document = await this.repository.getOneById(request.id);
    } catch (error) {
      console.error("Error fetching document:", error);
      new InternalError("An error occurred while fetching the document.");
    }

    // Check if the document exists
    if (!document) {
      return new NotFoundError();
    }

    // Check if user can access this document
    if (document.userId !== this.currentUser.id) {
      return new AccessForbiddenError();
    }

    return {
      success: true,
      message: "Document get successfully.",
      document: document ? this.mapper.map(document) : null,
    };
  }
}
