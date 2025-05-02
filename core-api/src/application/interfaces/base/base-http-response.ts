/**
 * Interface representing a standard HTTP response format.
 * This interface encapsulates the structure of an HTTP response, including status code, description, and response data.
 *
 * @template IResponse - The type representing the response data that will be included in the HTTP response body.
 */
export default interface IBaseHttpResponse<IResponse> {
  /**
   * A brief description of the HTTP response. This can be used to provide additional context or details
   * about the response, such as error messages or status descriptions. This field is optional and can be `null`.
   */
  description: string | null;

  /**
   * The HTTP status code associated with the response. This code indicates the outcome of the request,
   * such as 200 for success, 404 for not found, or 500 for internal server error.
   */
  statusCode: number;

  /**
   * The response data to be included in the HTTP response body. This represents the actual data returned
   * from the request, such as user details, error information, or any other relevant content.
   */
  data: IResponse;
}
