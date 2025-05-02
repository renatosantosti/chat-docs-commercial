import { ErrorTypes } from "./error-types";

export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid Param: ${paramName}`);
    this.name = ErrorTypes.InvalidParamError;
  }
}
