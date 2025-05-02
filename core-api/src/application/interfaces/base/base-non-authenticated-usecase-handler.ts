import ITimeAdapter from "@/application/interfaces/adapters/time-provider";

/**
 * Base interface for use case handlers that do not require user authentication.
 *
 * This interface defines a structure for use cases where authentication is not necessary
 * to perform the operation. It is intended for scenarios where the action can be performed
 * by any user or external system without the need for verification of user credentials.
 *
 * Examples of such use cases might include public API endpoints, system health checks,
 * or other operations that do not involve sensitive user data.
 * This interface provides a generic structure for handling use cases with a request and response pattern.
 *
 * @template IRequest - The type representing the request object that the handler will process.
 * @template IResponse - The type representing the response object that the handler will return.
 */
export default interface IBaseNonAuthenticadedUseCaseRequestHandler<
  IRequest,
  IResponse,
> {
  /**
   * The time provider instance.
   * This property provides access to the current UTC datetime, typically used to timestamp operations.
   */
  readonly timeProvider?: ITimeAdapter;

  /**
   * Handles a request and returns a response.
   *
   * @param request - The request object containing the data needed to perform the use case.
   *                  This parameter is optional and may be omitted if the use case does not require any input.
   * @returns A promise that resolves to the response object or the response object directly,
   *          depending on the implementation. The response object contains the result of the use case operation.
   */
  handler(request?: IRequest): Promise<IResponse | Error> | IResponse | Error;
}
