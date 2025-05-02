import Joi from "joi";
import { inject, injectable } from "tsyringe";
import AuthUserDto from "@/domain/dtos/auth/user";
import { ErrorTypes } from "@/shared/errors/error-types";
import IBaseController from "@/application/interfaces/base/base-controller";
import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import { badRequestHttpError, forbiddenHttpError, internalHttpError, notFoundHttpError, ok } from "@/presentation/helpers/http-helper";
import { isNotError } from "@/shared/utils/dto-is-error-type-guard ";
import ChatDocRequest from "@/application/usecases/chatdoc/chatdoc-request";
import { ChatDocResponse } from "@/application/usecases/chatdoc/chatdoc-response";
import { IChatDocUseCase } from "@/application/interfaces/use-cases/chatdoc-usecase-interface";

@injectable()
export default class ChatDocController implements IBaseController<ChatDocRequest, ChatDocResponse> {
  currentUser?: AuthUserDto
  constructor(@inject('IChatDocUseCase') readonly useCase: IChatDocUseCase) {
  }

  public async handler(currentUser: AuthUserDto, request: ChatDocRequest): Promise<IBaseHttpResponse<ChatDocResponse | Error>> {
    this.currentUser = currentUser;

    try {   
      // Create a joi schema to validate the request
      const requestValidationSchema = Joi.object({
        documentId: Joi.number().greater(0).required(),
        question: Joi.string().required(),
        fragments: Joi.array<string>().min(1),
        previousQuestion: Joi.string().optional(),
        previousResponse: Joi.string().optional(),
      });
      
      // Do a request validation
      const { error } = requestValidationSchema.validate(request);
      if (error) {
        console.error("Validation error:", error.details);
        return badRequestHttpError(error);
      }

      // Fires usecase handler
      const response: ChatDocResponse | Error = await this.useCase.handler(this.currentUser, request);

      if (isNotError<ChatDocResponse>(response)) {
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
      console.error('Occured an error on ChatDocController', { error: error.message, name: error.name });
      return internalHttpError(error);
    }
  }
}
