import AuthUserDto from "@/domain/dtos/auth/user";
import { ErrorTypes } from "@/shared/errors/error-types";
import IBaseController from "@/application/interfaces/base/base-controller";
import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import CreateDocumentRequest from "@/application/usecases/document/create-document/create-document-request";
import { CreateDocumentResponse } from "@/application/usecases/document/create-document/create-document-response";
import { ICreateDocumentUseCase } from "@/application/interfaces/use-cases/create-document-usecase-interface";
import Joi from "joi";
import { badRequestHttpError, forbiddenHttpError, internalHttpError, notFoundHttpError, ok } from "@/presentation/helpers/http-helper";
import { inject, injectable } from "tsyringe";
import { isNotError } from "@/shared/utils/dto-is-error-type-guard ";


@injectable()
export default class CreateDocumentController implements IBaseController<CreateDocumentRequest, CreateDocumentResponse> {
  currentUser?: AuthUserDto
  constructor(@inject('ICreateDocumentUseCase') readonly useCase: ICreateDocumentUseCase) {
  }

  public async handler(currentUser: AuthUserDto, request: CreateDocumentRequest): Promise<IBaseHttpResponse<CreateDocumentResponse | Error>> {
    this.currentUser = currentUser;

    try {

      // Check file content
      

      // Create a joi schema to validate the request
      const requestValidationSchema = Joi.object({
        name: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().required(),
        //Here check if the file is a base64 string
        content: Joi.string().base64().min(1).required(),
      });
      
      // Do a request validation
      const { error } = requestValidationSchema.validate(request);
      if (error) {
        console.error("Validation error:", error.details);
        return badRequestHttpError(error);
      }

      // Fires usecase handler
      const response: CreateDocumentResponse | Error = await this.useCase.handler(this.currentUser, request);

      if (isNotError<CreateDocumentResponse>(response)) {
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
      console.error('Occured an error on CreateDocumentController', { error: error.message, name: error.name });
      return internalHttpError(error);
    }
  }
}
