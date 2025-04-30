
import AuthUserDto from "domain/dtos/auth/user";
import { ErrorTypes } from "shared/errors/error-types";
import IBaseController from "application/interfaces/base/base-controller";
import IBaseHttpResponse from "application/interfaces/base/base-http-response";
import UpdateDocumentRequest from "application/usecases/document/update-document/update-document-request";
import { UpdateDocumentResponse } from "application/usecases/document/update-document/update-document-response";
import { IUpdateDocumentUseCase } from "application/interfaces/use-cases/update-document-usecase-interface";
import Joi from "joi";
import { badRequestHttpError, forbiddenHttpError, internalHttpError, notFoundHttpError, ok } from "presentation/helpers/http-helper";
import { inject, injectable } from "tsyringe";
import { isNotError } from "shared/utils/dto-is-error-type-guard ";


@injectable()
export default class UpdateDocumentController implements IBaseController<UpdateDocumentRequest, UpdateDocumentResponse> {
  currentUser?: AuthUserDto

  constructor(@inject('IUpdateDocumentUseCase') readonly useCase: IUpdateDocumentUseCase) {
  }

  public async handler(currentUser: AuthUserDto, request: UpdateDocumentRequest): Promise<IBaseHttpResponse<UpdateDocumentResponse | Error>> {
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
        userId: Joi.number()
          .greater(0)
          .required()
          .messages({
            "any.required": "Document user's ID is required",
            "number.greater": "Document user's ID must be greater than 0",
          }),
        name: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required()
      });
      
      // Do a request validation
      const { error } = requestValidationSchema.validate(request);
      if (error) {
        console.error("Validation error:", error.details);
        return badRequestHttpError(error);
      }
      
      // Fires usecase handler
      const response: UpdateDocumentResponse | Error = await this.useCase.handler(this.currentUser, request);

      if (isNotError<UpdateDocumentResponse>(response)) {
        return ok(response);
      }

      // Othewise
      // Handle specific error types
      let responseError: IBaseHttpResponse<Error>;
      switch ((response as Error).name as ErrorTypes) {
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
      console.error("Error on UpdateDocumentController:", {error})
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
