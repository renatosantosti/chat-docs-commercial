
import AuthUserDto from "domain/dtos/auth/user";
import { ErrorTypes } from "shared/errors/error-types";
import IBaseController from "application/interfaces/base/base-controller";
import IBaseHttpResponse from "application/interfaces/base/base-http-response";
import GetDocumentRequest from "application/usecases/document/get-document/get-document-request";
import GetDocumentResponse from "application/usecases/document/get-document/get-document-response";
import { IGetDocumentUseCase } from "application/interfaces/use-cases/get-document-usecase-interface";
import { badRequestHttpError, forbiddenHttpError, internalHttpError, notFoundHttpError, ok } from "presentation/helpers/http-helper";
import Joi from "joi";
import { inject, injectable } from "tsyringe";
import { isNotError } from "shared/utils/dto-is-error-type-guard ";


@injectable()
export default class GetDocumentController implements IBaseController<GetDocumentRequest, GetDocumentResponse> {
  public currentUser?: AuthUserDto;
  constructor(@inject('IGetDocumentUseCase') readonly useCase: IGetDocumentUseCase) {
  }

  public async handler(currentUser: AuthUserDto, request: GetDocumentRequest): Promise<IBaseHttpResponse<GetDocumentResponse | Error>> {
    this.currentUser = currentUser;
    try {

      // Create a joi schema to validate the request
      const requestValidationSchema = Joi.object({
        id: Joi.number()
          .greater(0)
          .required()
          .messages({
            "any.required": "Document's ID is required",
            "number.greater": "Document's ID must be greater than 0",
          }),
      });

      // Do a request validation
      const { error } = requestValidationSchema.validate(request);
      if (error) {
        console.error("Validation error:", error.details);
        return badRequestHttpError(error);
      }

      // Fires usecase handler
      const response: GetDocumentResponse | Error = await this.useCase.handler(this.currentUser, request);

      if (isNotError<GetDocumentResponse>(response)) {
        return ok(response);
      }

      // Othewise
      // Handle specific error types
      let responseError: IBaseHttpResponse<Error>;
      switch (response.name as ErrorTypes) {
          case ErrorTypes.BadRequestError:
            responseError = badRequestHttpError(response);
            break;
          case ErrorTypes.NotFoundError:
            responseError = notFoundHttpError(response);
            break;
          case ErrorTypes.AccessForbiddenError:
            responseError = forbiddenHttpError(response);
            break;
          default:
            responseError = internalHttpError(response);
        }
        return responseError;
    }
    catch (error: any) {
      console.error('Occured an error to get a document', { error: error.message, name: error.name });
      let responseError: IBaseHttpResponse<Error>;
      switch (error?.name as ErrorTypes) {
        case ErrorTypes.AccessForbiddenError:
          responseError = forbiddenHttpError(error as Error);
          break;
        default:
          responseError = internalHttpError(error);
      }

      return responseError
    }
  }
}
