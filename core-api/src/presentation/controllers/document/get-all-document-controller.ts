
import AuthUserDto from "domain/dtos/auth/user";
import { ErrorTypes } from "shared/errors/error-types";
import IBaseController from "application/interfaces/base/base-controller";
import IBaseHttpResponse from "application/interfaces/base/base-http-response";
import GetAllDocumentResponse from "application/usecases/document/get-all-document/get-all-document-response";
import { IGetAllDocumentUseCase } from "application/interfaces/use-cases/get-all-document-usecase-interface";
import { forbiddenHttpError, internalHttpError, notFoundHttpError, ok } from "presentation/helpers/http-helper";
import { inject, injectable } from "tsyringe";
import { isNotError } from "shared/utils/dto-is-error-type-guard ";


@injectable()
export default class GetAllDocumentController implements IBaseController<null, GetAllDocumentResponse> {
  currentUser?: AuthUserDto
  constructor(@inject('IGetAllDocumentUseCase') readonly useCase: IGetAllDocumentUseCase) {
  }

  public async handler(currentUser: AuthUserDto): Promise<IBaseHttpResponse<GetAllDocumentResponse | Error>> {
    this.currentUser = currentUser;
    try {

      // Fires usecase handler
      const response: GetAllDocumentResponse = await this.useCase.handler(this.currentUser);

      if (isNotError<GetAllDocumentResponse>(response)) {
        return ok(response);
      }

      // Othewise
      // Handle specific error types
      let responseError: IBaseHttpResponse<Error>;
      switch ((response as Error).name as ErrorTypes) {
          case ErrorTypes.AccessForbiddenError:
            responseError = forbiddenHttpError(response);
            break;
          default:
            responseError = internalHttpError(response);
        }
        return responseError;
    }
    catch (error: any) {
      console.error('Occured an error to get all documents', { error: error.message, name: error.name });
      return internalHttpError(error);
    }
  }
}
