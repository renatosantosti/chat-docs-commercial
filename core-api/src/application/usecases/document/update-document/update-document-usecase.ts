import AuthUserDto from "domain/dtos/auth/user";
import { IUpdateDocumentUseCase } from "../../../interfaces/use-cases/update-document-usecase-interface";
import ITimeAdapter from "application/interfaces/adapters/time-provider";
import IDocumentRepository from "application/interfaces/repositories/document";
import IBaseMapper from "application/interfaces/base/base-mapper";
import DocumentDto from "domain/dtos/document";
import Document from "domain/models/document";
import { InternalError } from "shared/errors/internal-error";
import UpdateDocumentRequest from "./update-document-request";
import { UpdateDocumentResponse } from "./update-document-response";
import { AccessForbiddenError } from "shared/errors/access-forbidden-error";
import { BadRequestError } from "shared/errors/bad-request-error";
import { NotFoundError } from "shared/errors/not-found-error";

/**
 * Use case for creating a new document.
 * This class handles the logic for creating a new document in the system.
 * It implements the IBaseUseCaseHandler interface to adhere to a standard request-response pattern.
 */
export default class UpdateDocumentUseCase implements IUpdateDocumentUseCase{    
  
  public currentUser?: AuthUserDto;
  /**
   * Constructs a new UpdateDocumentUseCase.
   * 
   * @param currentDocument - The currently authenticated document.
   * @param timeProvider - The time provider used for obtaining the current UTC datetime.
   * @param mapper - Helper to map document model to DTO.
   */
  constructor(

    readonly timeProvider: ITimeAdapter,
    readonly repository: IDocumentRepository,
    readonly mapper: IBaseMapper<Document, DocumentDto>) {}

  /**
   * Handles the put document request.
   * 
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.  
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing the data needed to put a new document.
   * @returns A promise that resolves to a UpdateDocumentResponse object containing the result of the document creation process.
   */

  async handler(currentUser: AuthUserDto, request: UpdateDocumentRequest): Promise<UpdateDocumentResponse | Error> {
    this.currentUser = currentUser;
    // Check if the user has permission to view the requested user
    if (this.currentUser.id !== request.userId) {
      throw new AccessForbiddenError();
    }
      
    // Validate document data
    if (!request.title || !request.description || !request.userId) {
      throw new BadRequestError("Document title, description and userId are required.");
    }

    let document = null;
    try {
      // Fetch the document by ID
      document = await this.repository.getOneById(request.id);
    } catch (error) {
      console.error('Error fetching document:', error);
      throw new InternalError("An error occurred while fetching the document.");
    }

    // Check if the document exists and belongs to the user
    if (!document) {
      throw new NotFoundError();
    }

    if (document.userId !== request.userId) {
      return new AccessForbiddenError()
    }
    
    // Update the document with the new data
    document.title = request.title;
    document.description = request.description;
    document.modifiedOn = this.timeProvider.utcNow();
    document.modifiedBy = this.currentUser.email;

    let result: Document | null =  null;
    try{
        result = await this.repository.updateOne(document);
    }
    catch(error){
      return new InternalError("An error occurred while fetching the document.");
    }

    return {
      success: true,
      message: "Document updated successfully.",
      document: result ? this.mapper.map(result) :  undefined,
    };    
  }
}
