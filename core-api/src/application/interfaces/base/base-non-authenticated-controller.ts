import IBaseHttpResponse from "./base-http-response";

/**
 * Base interface for controllers that handle HTTP requests and responses that do not requires authentication/current user.
 * This interface defines a generic method for processing requests and returning HTTP responses.
 *
 * @template IRequest - The type representing the request object that the controller will process.
 * @template IResponse - The type representing the response object that the controller will return.
 */
export default interface IBaseNonAuthenticadedController<IRequest, IResponse> {
  /**
   * Handles an HTTP request and returns an HTTP response.
   *
   * @param request - The request object containing data needed to process the HTTP request.
   *                  This parameter can be of any type, but it is recommended to use a specific request type
   *                  to ensure type safety.
   * @returns A promise that resolves to an `IBaseHttpResponse` containing the response data.
   *          `IBaseHttpResponse` encapsulates the HTTP response format including status code, headers, and body.
   */
  handler: (
    request: IRequest | any,
  ) =>
    | Promise<IBaseHttpResponse<IResponse | Error>>
    | IBaseHttpResponse<IResponse | Error>;
}
