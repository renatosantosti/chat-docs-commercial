import IBaseUseCaseResponse from "@/application/interfaces/base/base-usecase-response";
import { ChatDocResultDto } from "@/domain/dtos/search-dtos";

export class ChatDocResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new  ChatDocResponse object.
   *
   * @param success - Indicates whether chat was generated successfully or not.
   * @param message - Provides a message related to the operation result, typically used for conveying success or error information.
   * @param result  - The retrieved chat conversation result data transfer object (DTO) document. This will be null if found any error.
   */
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly result: ChatDocResultDto,
  ) {}
}
