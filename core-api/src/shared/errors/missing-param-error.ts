import { ErrorTypes } from "./error-types";

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing Param: ${paramName}`);
    this.name = ErrorTypes.MissingParamError;
  }
}
