import AuthUserDto from "@/domain/dtos/auth/user";
import { ErrorTypes } from "@/shared/errors/error-types";
import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import Joi from "joi";
import {
  badRequestHttpError,
  forbiddenHttpError,
  internalHttpError,
  notFoundHttpError,
  ok,
} from "@/presentation/helpers/http-helper";
import { inject, injectable } from "tsyringe";
import { isNotError } from "@/shared/utils/dto-is-error-type-guard ";
import { GetDocumentSuggestionsResponse } from "@/application/interfaces/use-cases/document/get-suggestions/get-document-suggestions-response";
import { IGetDocumentSuggestionsUseCase } from "@/application/interfaces/use-cases/document/get-suggestions/get-document-suggestions-usecase-interface";
import GetDocumentSuggestionsRequest from "@/application/interfaces/use-cases/document/get-suggestions/get-document-suggestions-request";
import IBaseNonAuthenticadedController from "@/application/interfaces/base/base-non-authenticated-controller";

@injectable()
export default class GetDocSuggestionsController
  implements
    IBaseNonAuthenticadedController<
      GetDocumentSuggestionsRequest,
      GetDocumentSuggestionsResponse
    >
{
  currentUser?: AuthUserDto;
  constructor(
    @inject("IGetDocumentSuggestionsUseCase")
    readonly useCase: IGetDocumentSuggestionsUseCase,
  ) {}

  public async handler(
    request: GetDocumentSuggestionsRequest,
  ): Promise<IBaseHttpResponse<GetDocumentSuggestionsResponse | Error>> {
    try {
      // Create a joi schema to validate the request
      const requestValidationSchema = Joi.object({
        fileName: Joi.string().required(),
        contentSample: Joi.string().required(),
      });

      // Do a request validation
      const { error } = requestValidationSchema.validate(request);
      if (error) {
        console.error("Validation error:", error.details);
        return badRequestHttpError(error);
      }

      // Fires usecase handler
      const response: GetDocumentSuggestionsResponse | Error =
        await this.useCase.handler(request);

      if (isNotError<GetDocumentSuggestionsResponse>(response)) {
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
    } catch (error: any) {
      console.error("Occured an error on GetDocSuggestionsController", {
        error: error.message,
        name: error.name,
      });
      return internalHttpError(error);
    }
  }
}
