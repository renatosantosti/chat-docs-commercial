import LiveResponse from "./live-response";
import ILiveUseCase from "../../interfaces/use-cases/live-usecase-interface";

export default class LiveUseCase implements ILiveUseCase {
  async handler(): Promise<LiveResponse> {
    const liveStatus: LiveResponse = { live: true };
    return liveStatus;
  }
}
