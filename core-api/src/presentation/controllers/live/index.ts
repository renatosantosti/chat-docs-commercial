import { Get, Route, SuccessResponse } from "tsoa";
import { ok } from "../../helpers/http-helper";
import HttpStatusCode from "../../helpers/http-status";
import LiveResponse from "@/application/usecases/live/live-response";
import ILiveUseCase from "@/application/interfaces/use-cases/live-usecase-interface";
import IBaseNonAuthenticadedController from "@/application/interfaces/base/base-non-authenticated-controller";
import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import { inject, injectable } from "tsyringe";

@Route("live")
@injectable()
export default class LiveController
  implements IBaseNonAuthenticadedController<any, LiveResponse | Error>
{
  constructor(
    @inject("ILiveUseCase") private readonly checkLive: ILiveUseCase,
  ) {}

  @Get("/live")
  @SuccessResponse(HttpStatusCode.OK, "Is API live?")
  public async handler(): Promise<IBaseHttpResponse<LiveResponse | Error>> {
    const result = await this.checkLive.handler();
    return ok(result);
  }
}
