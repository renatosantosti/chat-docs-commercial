import IBaseHttpResponse from "@/application/interfaces/base/base-http-response";
import { InternalError } from "../../shared/errors/internal-error";
import { UnauthorizedError } from "../../shared/errors/unauthorized-error";
import HttpStatusCode from "./http-status";

export const badRequestHttpError = (
  error: Error,
): IBaseHttpResponse<Error> => ({
  description: "Bad Request",
  statusCode: HttpStatusCode.BAD_REQUEST,
  data: {
    message: error?.stack ?? error.message,
    name: error.name,
    stack: error?.stack,
  },
});

export const conflictRequestHttpError = (
  error: Error,
): IBaseHttpResponse<Error> => ({
  description: "Conflict Request",
  statusCode: HttpStatusCode.CONFLICT,
  data: { message: error.message, name: error.name, stack: error?.stack },
});

export const forbiddenHttpError = (error: Error): IBaseHttpResponse<Error> => ({
  description: "Access Forbidden",
  statusCode: HttpStatusCode.FORBIDDEN,
  data: { message: error.message, name: error.name, stack: error?.stack },
});

export const invalidParamHttpError = (
  error: Error,
): IBaseHttpResponse<Error> => ({
  description: "Invalid Param",
  statusCode: HttpStatusCode.BAD_REQUEST,
  data: { message: error.message, name: error.name, stack: error?.stack },
});

export const missingParamHttpError = (
  error: Error,
): IBaseHttpResponse<Error> => ({
  description: "Missing Param",
  statusCode: HttpStatusCode.BAD_REQUEST,
  data: { message: error.message, name: error.name, stack: error?.stack },
});

export const notFoundHttpError = (error: Error): IBaseHttpResponse<Error> => ({
  description: "Resource Not Found",
  statusCode: HttpStatusCode.NOT_FOUND,
  data: { message: error.message, name: error.name, stack: error?.stack },
});

export const unauthorizedHttpError = (
  error: UnauthorizedError,
): IBaseHttpResponse<UnauthorizedError> => ({
  description: "Unauthorized Access",
  statusCode: HttpStatusCode.UNAUTHORIZED,
  data: { message: error.message, name: error.name, stack: error?.stack },
});

export const internalHttpError = (
  error: Error,
): IBaseHttpResponse<InternalError> => {
  return {
    description: "Internal Server Error",
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    data: { message: error.message, name: error.name, stack: error?.stack },
  };
};

export const ok = <T>(
  data: T,
  description: string = "Success",
): IBaseHttpResponse<T> => ({
  description,
  statusCode: HttpStatusCode.OK,
  data: data,
});

export const noContentHttpError = (): IBaseHttpResponse<undefined | null> => ({
  description: "No Content Error",
  statusCode: HttpStatusCode.NO_CONTENT,
  data: null,
});
