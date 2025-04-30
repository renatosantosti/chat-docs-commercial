import AuthUserDto from "domain/dtos/auth/user";
import { ErrorTypes } from "shared/errors/error-types";
import IBaseController from "application/interfaces/base/base-controller";
import IBaseHttpResponse from "application/interfaces/base/base-http-response";
import UpdateUserRequest from "application/usecases/user/update-user/update-user-request";
import UpdateUserResponse from "application/usecases/user/update-user/update-user-response";
import { IUpdateUserUseCase } from "application/interfaces/use-cases/update-user-usecase-interface";
import { badRequestHttpError, conflictRequestHttpError, forbiddenHttpError, internalHttpError, notFoundHttpError, ok } from "presentation/helpers/http-helper";
import { inject, injectable } from "tsyringe";
import Joi from "joi";
import { EmailInUseError, NotFoundError } from "shared/errors";
import { isNotError } from "shared/utils/dto-is-error-type-guard ";

@injectable()
export default class UpdateUserController
  implements IBaseController<UpdateUserRequest, UpdateUserResponse>
{
  currentUser?: AuthUserDto;
  /**
   * Constructor for the UpdateUserController class.
   *
   * @param currentUser - The currently authenticated user.
   * @param timeProvider - A time provider used to obtain the current UTC date and time.
   * @param useCase - The use case responsible for handling the user update logic.
   */
  constructor(
    @inject('IUpdateUserUseCase') readonly useCase: IUpdateUserUseCase
  ) {}

  /**
   * Handles the user update request.
   *
   * @param request - The request object containing the user ID and the data to be updated.
   * @returns A promise that resolves to an appropriate HTTP response based on the operation's outcome.
   */
  public async handler(
    currentUser: AuthUserDto,
    request: UpdateUserRequest
  ): Promise<IBaseHttpResponse<UpdateUserResponse | Error>> {
    this.currentUser = currentUser;
    
    try {
      // Define the validation requirements for the request
      const requestValidationSchema = Joi.object({
        id: Joi.number().integer().min(1).required().label("id"), // Validates that the ID is a positive integer
        name: Joi.string().min(3).max(50).required().label("name"), // Validates the name with a length between 3 and 50 characters
        password: Joi.string().min(6).max(100).required().label("password"), // Validates the password with a length between 6 and 100 characters
        repeatedPassword: Joi.string()
          .valid(Joi.ref("password"))
          .required()
          .label("repeatedPassword") // Ensures repeatedPassword matches password
          .messages({ "any.only": "Passwords must match" }),
        image: Joi.string()
          .pattern(/^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+$/)
          .optional()
          .label("image") // Validates the image as an optional base64 string
          .messages({ "string.pattern.base": "Photo must be a valid base64 string" }),
      }).unknown(true);

      // Perform request validation
      const { error } = requestValidationSchema.validate(request);

      if (error) {
        // If validation fails, return an HTTP 400 (Bad Request) error
        console.error("Validation error:", error.details);
        return badRequestHttpError(error);
      }

      // Trigger the use case handler to update the user
      const response: UpdateUserResponse | Error = await this.useCase.handler(this.currentUser, request);

      //If Success
      if (isNotError<UpdateUserResponse>(response)) {
        return ok(response); // Return an HTTP 200 (OK) response with the updated user
      }
      
      // Othewise
      // Handle specific error types
      let responseError: IBaseHttpResponse<Error>;
      switch (response.name as ErrorTypes) {
        case ErrorTypes.Conflict:
          responseError = conflictRequestHttpError(response);
          break;
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
      // Handle errors during execution
      console.error("An error occurred while updating the user", {
        error: error.message,
        name: error.name,
      });

      return  internalHttpError(error as Error);
    }
  }
}
