import IBaseUseCaseRequestHandler from "@/application/interfaces/base/base-usecase-handler";
import ChatDocRequest from "@/application/interfaces/use-cases/chat-doc/chatdoc-request";
import { ChatDocResponse } from "@/application/interfaces/use-cases/chat-doc/chatdoc-response";
import AuthUserDto from "@/domain/dtos/auth/user";

/**
 * Interface representing a generic use case request handler.
 *
 * @template ChatDocRequest - The type representing the request object.
 * @template ChatDocResponse - The representing the response object.
 */
export interface IChatDocUseCase
  extends IBaseUseCaseRequestHandler<ChatDocRequest, ChatDocResponse> {
  /**
   * Handles a use case request and returns the corresponding response.
   *
   * @param request - The request object containing the necessary data for the use case.
   * @param currentUser - The currently authenticated user. This parameter is required to ensure that the use case is executed in the context of the authenticated user.
   *                     It is typically used for authorization checks or to associate the operation with the user.
   * @returns A promise that resolves with the response object containing the result of the use case.
   */
  handler(
    currentUser: AuthUserDto,
    request: ChatDocRequest,
  ): Promise<ChatDocResponse | Error>;
}
