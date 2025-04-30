/**
 * Base interface for service handlers that do not require user authentication.
 * 
 * This interface defines a structure for services where authentication is not necessary
 * to perform the operation. It is intended for scenarios where the action can be performed
 * by any user or external system without the need for verification of user credentials.
 * 
 * 
 * @template IRequest - The type representing the request object that the handler will process.
 * @template IResponse - The type representing the response object that the handler will return.
 */
export default interface IBaseService<IRequest, IResponse> {

  /**
   * Executes service over request and returns a response.
   * 
   * @param request - The request object containing the data needed to perform the service.
   *                  This parameter is optional and may be omitted if the service does not require any input.
   * @returns A promise that resolves to the response object or the response object directly,
   *          depending on the implementation. The response object contains the result of the service operation.
   */
  execute(request: IRequest): Promise<IResponse | Error> | IResponse | Error;
}
