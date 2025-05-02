import { inject, injectable } from "tsyringe";
import Joi from "joi";
import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import IBaseNonAuthenticadedController from "@/application/interfaces/base/base-non-authenticated-controller";
import AuthRequest from "@/application/usecases/auth/auth-request";
import AuthResponse from "@/application/usecases/auth/auth-response";
import {
  badRequestHttpError,
  internalHttpError,
  ok,
  unauthorizedHttpError,
} from "@/presentation/helpers/http-helper";
import { ErrorTypes } from "@/shared/errors/error-types";
import { isNotError } from "@/shared/utils/dto-is-error-type-guard ";
import IAuthUseCase from "@/application/interfaces/use-cases/auth-usecase-interface";

@injectable()
export default class AuthController
  implements IBaseNonAuthenticadedController<AuthRequest, AuthResponse>
{
  constructor(@inject("IAuthUseCase") readonly authUseCase: IAuthUseCase) {}
  public async handler(
    request: AuthRequest,
  ): Promise<IBaseHttpResponse<AuthResponse | Error>> {
    // Create a joi schema to validate the request
    const requestValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    // Do a request validation
    const { error } = requestValidationSchema.validate(request);
    if (error) {
      console.error("Validation error:", error.details);
      return badRequestHttpError(error);
    }

    try {
      const response = await this.authUseCase.handler(request);

      if (isNotError<AuthResponse>(response)) {
        return ok(response);
      }

      // Othewise
      // Handle specific error types
      let responseError: IBaseHttpResponse<Error>;
      switch ((response as Error).name as ErrorTypes) {
        case ErrorTypes.BadRequestError:
          responseError = badRequestHttpError(response);
          break;
        case ErrorTypes.UnauthorizedError:
          responseError = unauthorizedHttpError(response);
          break;
        default:
          responseError = internalHttpError(response);
      }
      return responseError;
    } catch (error: any) {
      console.error("Internal Error on auth usecase:", {
        error: error.message,
        name: error.name,
      });
      return internalHttpError(error);
    }
  }
}
