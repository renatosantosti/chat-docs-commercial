import AuthUserDto from "@/domain/dtos/auth/user";
import ITimeAdapter from "../adapters/time-provider";
import IBaseRepository from "./base-repository";

/**
 * Base interface for use case handlers.
 * This interface provides a generic structure for handling use cases with a request and response pattern.
 *
 * @template IRequest - The type representing the request object that the handler will process.
 * @template IResponse - The type representing the response object that the handler will return.
 */
export default interface IBaseUseCaseRequestHandler<IRequest, IResponse> {
  /**
   * The current authenticated user.
   * This property holds the user information for the user who is currently making the request.
   */
  currentUser?: AuthUserDto;

  /**
   * The time provider instance.
   * This property provides access to the current UTC datetime, typically used to timestamp operations.
   */
  readonly timeProvider: ITimeAdapter;

  /**
   * The repository instance.
   *
   * This property provides access to the repository that the controller interacts with for data
   * persistence operations. The repository follows a generic interface and ensures consistent
   * data handling practices within the application.
   *
   * @type {IBaseRepository<any>} - A generic repository interface that supports operations
   *                                 for any data type.
   */
  readonly repository: IBaseRepository<any>;
  /**
   * Handles a request and returns a response.
   *
   * @param request - The request object containing the data needed to perform the use case.
   *                  This parameter is optional and may be omitted if the use case does not require any input.
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @returns A promise that resolves to the response object or the response object directly,
   *          depending on the implementation. The response object contains the result of the use case operation.
   */
  handler(
    currentUser: AuthUserDto,
    request?: IRequest,
  ): Promise<IResponse | Error> | IResponse | Error;
}
