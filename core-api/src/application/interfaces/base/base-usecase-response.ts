/**
 * Base interface for all use case responses.
 * This interface provides a standard structure for the result of any use case operation.
 */
export default interface IBaseUseCaseResponse {
  /**
   * Indicates whether the use case operation was successful.
   */
  success: boolean;

  /**
   * Provides a message related to the use case operation.
   * This message typically contains information about the operation result, such as an error or success message.
   */
  message: string;
}
