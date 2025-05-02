import { ErrorTypes } from "./error-types";

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized Error");
    this.name = ErrorTypes.UnauthorizedError;
  }
}
