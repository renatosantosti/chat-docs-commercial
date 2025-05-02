import IBaseUseCaseResponse from "@/application/interfaces/base/base-usecase-response";
import { SearchResultDto } from "@/domain/dtos/search-dtos";

export class SearchTermResponse implements IBaseUseCaseResponse {
  /**
   * Constructs a new SearchTermResponse object.
   * 
   * @param success - Indicates whether search is successfull or not.
   * @param message - Provides a message related to the operation result, typically used for conveying success or error information.
   * @param result  - The retrieved search result data transfer object (DTO) document. This will be null if found any error.
   */
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly result: SearchResultDto[]
  ) { }
}
