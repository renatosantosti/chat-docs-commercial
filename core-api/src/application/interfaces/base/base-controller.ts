import AuthUserDto from "@/domain/dtos/auth/user";
import IBaseHttpResponse from "./base-http-response";
import IBaseUseCaseRequestHandler from "./base-usecase-handler";

/**
 * Base interface for authenticated controllers that process HTTP requests and responses.
 *
 * This interface defines the structure for controllers that require an authenticated user
 * and interact with a use case to handle HTTP requests and produce responses.
 * It enforces a consistent pattern for processing requests, handling business logic, and
 * returning structured HTTP responses.
 *
 * @template IRequest - The type representing the request object that the controller will process.
 * @template IResponse - The type representing the response object that the controller will return.
 */
export default interface IBaseController<IRequest, IResponse> {
  /**
   * The current authenticated user.
   *
   * This property holds the data transfer object (DTO) representing the user who is
   * currently authenticated and making the request. The user's information is essential for
   * performing authorization checks and auditing actions within the controller.
   */
  currentUser?: AuthUserDto;

  /**
   * The use case handler instance.
   *
   * This property holds the use case handler that the controller uses to execute the business logic
   * corresponding to the request. The use case handler processes the input request and produces a
   * response that the controller can convert into an HTTP response.
   *
   * @type {IBaseUseCaseRequestHandler<IRequest, IResponse>} - A generic use case handler interface
   *                                                           that processes requests and produces responses.
   */
  readonly useCase: IBaseUseCaseRequestHandler<IRequest, IResponse>;

  /**
   * Handles an HTTP request and returns an HTTP response.
   *
   * This method processes the incoming HTTP request by passing it to the appropriate use case
   * handler. The result is then wrapped in an `IBaseHttpResponse` object that encapsulates the
   * HTTP response format, including status code, headers, and body content.
   *
   * @param {IRequest | any} request - The request object containing data needed to process the HTTP request.
   *                                   It is recommended to use a specific request type for type safety,
   *                                   but any type can be passed.
   *
   * @returns {Promise<IBaseHttpResponse<IResponse | Error>> | IBaseHttpResponse<IResponse | Error>}
   *          A promise that resolves to an `IBaseHttpResponse` or an `IBaseHttpResponse` object directly.
   *          The response encapsulates the outcome of the operation, including success or error details.
   */
  handler: (
    currentUser: AuthUserDto,
    request: IRequest | any,
  ) =>
    | Promise<IBaseHttpResponse<IResponse | Error>>
    | IBaseHttpResponse<IResponse | Error>;
}
