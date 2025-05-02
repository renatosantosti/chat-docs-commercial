import AuthUserDto from "@/domain/dtos/auth/user";
import { ErrorTypes } from "@/shared/errors/error-types";
import IBaseController from "@/application/interfaces/base/base-controller";
import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import {
  badRequestHttpError,
  conflictRequestHttpError,
  forbiddenHttpError,
  internalHttpError,
  notFoundHttpError,
  ok,
} from "@/presentation/helpers/http-helper";
import GetUserRequest from "@/application/usecases/user/get-user/get-user-request";
import GetUserResponse from "@/application/usecases/user/get-user/get-user-response";
import { IGetUserUseCase } from "@/application/interfaces/use-cases/get-user-usecase-interface";
import { inject, injectable } from "tsyringe";
import Joi from "joi";
import { isNotError } from "@/shared/utils/dto-is-error-type-guard ";

/**
 * Controller for handling user retrieval requests.
 * This class validates incoming requests and delegates business logic to the use case layer.
 */
@injectable()
export default class GetUserController
  implements IBaseController<GetUserRequest, GetUserResponse>
{
  currentUser?: AuthUserDto;
  /**
   * Constructs a new GetUserController.
   *
   * @param currentUser - The currently authenticated user.
   * @param timeProvider - The time provider used for obtaining the current UTC datetime.
   * @param useCase - The use case for handling the user retrieval logic.
   */
  constructor(@inject("IGetUserUseCase") readonly useCase: IGetUserUseCase) {}

  /**
   * Handles the incoming request to retrieve a user.
   *
   * @param request - The request object containing the user ID.
   * @returns A promise resolving to a proper HTTP response based on the result of the operation.
   */
  public async handler(
    currentUser: AuthUserDto,
    request: GetUserRequest,
  ): Promise<IBaseHttpResponse<GetUserResponse | Error>> {
    this.currentUser = currentUser;

    // Define validation requirements for the request
    const requestValidationSchema = Joi.object({
      id: Joi.number().greater(0).required().messages({
        "any.required": "User's ID is required",
        "number.greater": "User's ID must be greater than 0",
      }),
    });

    // Perform request validation
    const { error } = requestValidationSchema.validate(request);

    if (error) {
      console.error("Validation error:", error.details);
      return badRequestHttpError(error);
    }

    try {
      // Fires the use case handler
      const response: GetUserResponse | Error = await this.useCase.handler(
        this.currentUser,
        request,
      );

      if (isNotError<GetUserResponse>(response)) {
        return ok(response);
      }

      // Othewise
      // Handle specific error types
      let responseError: IBaseHttpResponse<Error>;
      switch (response?.name as ErrorTypes) {
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
      console.error("An error occurred while retrieving the user", {
        error: error.message,
        name: error.name,
      });

      return internalHttpError(error as Error);
    }
  }
}
