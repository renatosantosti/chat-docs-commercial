import GetDocumentSuggestionsRequest from "./get-document-suggestions-request";
import { GetDocumentSuggestionsResponse } from "./get-document-suggestions-response";
import IBaseNonAuthenticadedUseCaseRequestHandler from "@/application/interfaces/base/base-non-authenticated-usecase-handler";

export interface IGetDocumentSuggestionsUseCase
  extends IBaseNonAuthenticadedUseCaseRequestHandler<
    GetDocumentSuggestionsRequest,
    GetDocumentSuggestionsResponse
  > {
  handler(
    request: GetDocumentSuggestionsRequest,
  ): Promise<GetDocumentSuggestionsResponse | Error>;
}
