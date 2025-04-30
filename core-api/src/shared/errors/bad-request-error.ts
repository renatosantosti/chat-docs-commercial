import { ErrorTypes } from "./error-types"

export class BadRequestError extends Error {
  constructor(paramName: string) {
    const msg= `Bad Request Error${paramName 
        ? ':' + paramName 
        : ''}`;

    super("Bad Request Error")
    this.name = ErrorTypes.BadRequestError
    this.stack =  msg;
  }
}
