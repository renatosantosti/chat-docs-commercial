import CreateUserResponse from "../../usecases/user/create-user/create-user-response";
import CreateUserRequest from "../../usecases/user/create-user/create-user-request";
import IBaseNonAuthenticadedUseCaseRequestHandler from "@/application/interfaces/base/base-non-authenticated-usecase-handler";

/**
 * Interface representing a use case for creating a user.
 *
 * @template CreateUserRequest - The type orepresenting the request object.
 * @template CreateUserResponse - The representing the response object.
 */
export interface ICreateUserUseCase
  extends IBaseNonAuthenticadedUseCaseRequestHandler<
    CreateUserRequest,
    CreateUserResponse
  > {
  /**
   * Handles the user creation process based on the provided request.
   * @param request - The request object containing the user data to be created.
   * @returns - A promise that resolves to a CreateUserResponse object containing the result of the user creation process.
   */
  handler(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse | Error> | CreateUserResponse | Error;
}
