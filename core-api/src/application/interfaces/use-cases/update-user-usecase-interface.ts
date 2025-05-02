import IBaseUseCaseRequestHandler from "@/application/interfaces/base/base-usecase-handler";
import UpdateUserRequest from "../../usecases/user/update-user/update-user-request";
import UpdateUserResponse from "../../usecases/user/update-user/update-user-response";
import AuthUserDto from "@/domain/dtos/auth/user";

/**
 * Interface representing a generic use case request handler.
 * 
 * @template UpdateUserRequest - The type orepresenting the request object.
 * @template UpdateUserResponse - The representing the response object.
 */
export interface IUpdateUserUseCase extends IBaseUseCaseRequestHandler<UpdateUserRequest, UpdateUserResponse | Error> {
  /**
   * Handles a use case request and returns the corresponding response.
   * 
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @param request - The request object containing the necessary data for the use case.
   * @returns A promise that resolves with the response object containing the result of the use case.
   */
  handler(currentUser: AuthUserDto, request: UpdateUserRequest): Promise<UpdateUserResponse | Error> | UpdateUserResponse | Error;
}
