import IBaseNonAuthenticadedUseCaseRequestHandler from "@/application/interfaces/base/base-non-authenticated-usecase-handler";
import LiveResponse from "../../usecases/live/live-response";

export default interface ILiveUseCase
  extends IBaseNonAuthenticadedUseCaseRequestHandler<null, LiveResponse> {}
