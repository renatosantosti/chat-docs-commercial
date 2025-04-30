import Joi from "joi";
import { inject, injectable } from "tsyringe";
import AuthUserDto from "domain/dtos/auth/user";
import { ErrorTypes } from "shared/errors/error-types";
import IBaseController from "application/interfaces/base/base-controller";
import IBaseHttpResponse from "application/interfaces/base/base-http-response";
import { badRequestHttpError, forbiddenHttpError, internalHttpError, notFoundHttpError, ok } from "presentation/helpers/http-helper";
import { isNotError } from "shared/utils/dto-is-error-type-guard ";
import { SearchTermResponse } from "application/usecases/search/search-response";
import SearchTermRequest from "application/usecases/search/search-request";
import { ISearchTermUseCase } from "application/interfaces/use-cases/search-usecase-interface";


@injectable()
export default class SearchTermController implements IBaseController<SearchTermRequest, SearchTermResponse> {
  currentUser?: AuthUserDto
  constructor(@inject('ISearchTermUseCase') readonly useCase: ISearchTermUseCase) {
  }

  public async handler(currentUser: AuthUserDto, request: SearchTermRequest): Promise<IBaseHttpResponse<SearchTermResponse | Error>> {
    this.currentUser = currentUser;

    try {   
      // Create a joi schema to validate the request
      const requestValidationSchema = Joi.object({
        mode: Joi.string().required(),
        term: Joi.string().required(),
        documentId: Joi.number().optional(),
      });
      
      // Do a request validation
      const { error } = requestValidationSchema.validate(request);
      if (error) {
        console.error("Validation error:", error.details);
        return badRequestHttpError(error);
      }

      // Fires usecase handler
      const response: SearchTermResponse | Error = await this.useCase.handler(this.currentUser, request);

      if (isNotError<SearchTermResponse>(response)) {
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
      console.error('Occured an error on SearchTermController', { error: error.message, name: error.name });
      return internalHttpError(error);
    }
  }
}
