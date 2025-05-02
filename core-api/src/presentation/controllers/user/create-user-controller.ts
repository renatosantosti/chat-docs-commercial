import { inject, injectable } from "tsyringe";
import Joi from "joi";
import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import IBaseNonAuthenticadedController from "@/application/interfaces/base/base-non-authenticated-controller";
import { badRequestHttpError, internalHttpError, ok,} from "@/presentation/helpers/http-helper";
import CreateUserRequest from "@/application/usecases/user/create-user/create-user-request";
import CreateUserResponse from "@/application/usecases/user/create-user/create-user-response";
import { ICreateUserUseCase } from "@/application/interfaces/use-cases/create-user-usecase-interface";
import { isNotError } from "@/shared/utils/dto-is-error-type-guard ";
import { ErrorTypes } from "@/shared/errors/error-types";

@injectable()
export default class CreateUserController implements IBaseNonAuthenticadedController<CreateUserRequest, CreateUserResponse> {
  constructor(
    @inject('ICreateUserUseCase') readonly  createUseCase: ICreateUserUseCase,
  ) {}
  public async handler(request: CreateUserRequest): Promise<IBaseHttpResponse<CreateUserResponse | Error>> {
    // Create a joi schema to validate the request
    const requestValidationSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      repeatedPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({ "any.only": "Passwords do not match" }),
      image: Joi.string()
        .pattern(/^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+$/)
        .optional()
        .label("image") // Validates the image as an optional base64 string
        .messages({ "string.pattern.base": "Photo must be a valid base64 string" }),
    });
    
    // Do a request validation
    const { error } = requestValidationSchema.validate(request);
    if (error) {
      console.error("Validation error:", error.details);
      return badRequestHttpError(error);
    }

    try {
      const response = await this.createUseCase.handler(request);
      if(isNotError<CreateUserResponse>(response))
        return ok(response);

      // Othewise
      // Handle specific error types
      let responseError: IBaseHttpResponse<Error>;
      switch (response?.name as ErrorTypes) {
          case ErrorTypes.BadRequestError:
            responseError = badRequestHttpError(response);
            break;
          default:
            responseError = internalHttpError(response);
        }
        return responseError;

    } catch (error: any) {
      console.error('Internal Error', { error: error.message, name: error.name });
      return internalHttpError(error);
    }
  }
}
