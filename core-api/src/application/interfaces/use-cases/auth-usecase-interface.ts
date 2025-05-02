import IBaseNonAuthenticadedUseCaseRequestHandler from "@/application/interfaces/base/base-non-authenticated-usecase-handler";
import AuthRequest from "@/application/usecases/auth/auth-request";
import AuthResponse from "@/application/usecases/auth/auth-response";

/**
 * Interface representing an authentication use case.
 * Extends the `IBaseUseCaseRequestHandler` to handle authentication requests.
 * 
 * @template AuthRequest - The type representing the authentication request.
 * @template AuthResponse - The type representing the authentication response.
 */
export default interface IAuthUseCase extends IBaseNonAuthenticadedUseCaseRequestHandler<AuthRequest, AuthResponse> {

  /**
   * Handles the authentication process based on the provided request.
   * 
   * @param request - The authentication request containing credentials and other relevant information.
   * @returns A promise that resolves to an `AuthResponse` object or an `AuthResponse` directly, 
   *          depending on the implementation. The response typically contains the authentication result,
   *          such as a token, user information, or an error message.
   */
  handler(request: AuthRequest): Promise<AuthResponse | Error> | AuthResponse | Error;
}
