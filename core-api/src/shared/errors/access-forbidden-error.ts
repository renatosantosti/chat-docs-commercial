import { ErrorTypes } from "./error-types";

export class AccessForbiddenError extends Error {
  constructor() {
    super("Access Forbidden");
    this.name = ErrorTypes.AccessForbiddenError;
  }
}
