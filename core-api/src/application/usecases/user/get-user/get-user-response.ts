import IBaseUseCaseResponse from "application/interfaces/base/base-usecase-response";
import UserDto from "domain/dtos/user";

/**
 * Response object for the create user operation.
 * This object encapsulates the result of the user creation process, implementing the base response structure.
 */
export default class GetUserResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new CreateUserResponse object.
   * 
   * @param success - Indicates whether the user creation operation was successful.
   * @param message - Provides a message related to the operation result, typically used for conveying success or error information.
   * @param user - The retrieved user data transfer object (DTO) user. This will be null if is found any error.
   */
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly user?: UserDto,
  ) { }
}
