import AuthUserDto from "@/domain/dtos/auth/user";
import DocumentDto from "@/domain/dtos/document";
import Document from "@/domain/models/document";
import { IGetAllDocumentUseCase } from "../../../interfaces/use-cases/document/get-all/get-all-document-usecase-interface";
import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import IDocumentRepository from "@/application/interfaces/repositories/document";
import IBaseMapper from "@/application/interfaces/base/base-mapper";
import GetAllDocumentResponse from "../../../interfaces/use-cases/document/get-all/get-all-document-response";
import { InternalError } from "@/shared/errors/internal-error";

/**
 * Use case for creating a new document.
 * This class handles the logic for creating a new document in the system.
 * It implements the IBaseUseCaseHandler interface to adhere to a standard request-response pattern.
 */
export default class GetAllDocumentUseCase implements IGetAllDocumentUseCase {
  public currentUser?: AuthUserDto;

  /**
   * Constructs a new GetAllDocumentUseCase.
   * @param timeProvider  - The time provider used for obtaining the current UTC datetime.
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
   *
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing the data needed to get a new document.
   * @returns A promise that resolves to a GetDocumentResponse object containing the result of the document creation process.
   */
  async handler(currentUser: AuthUserDto): Promise<GetAllDocumentResponse> {
    this.currentUser = currentUser;
    let documents: DocumentDto[] = [];

    try {
      const result = await this.repository.getAllByUserId(this.currentUser?.id);
      documents = result ? this.mapper.mapArray(result) : [];
      return {
        success: true,
        message: "All documents was listed successfully.",
        documents,
      };
    } catch (err: any) {
      throw new InternalError(
        err.message ?? "Unknow error to get all documents by user´s id.",
      );
    }
  }
}
