import { ErrorTypes } from "./error-types"

export class InternalError extends Error {
  constructor(stack: string) {
    super('Internal Server Error')
    this.name = ErrorTypes.InternalError
    this.stack = stack
  }
}
