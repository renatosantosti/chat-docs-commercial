import { ErrorTypes } from "./error-types";

export class ConflictError extends Error {
  constructor(rootCause: string) {
    const msg = `Conflicting Error`;
    super(msg);
    this.name = ErrorTypes.Conflict;
    this.stack = rootCause;
  }
}
