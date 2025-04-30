import { ErrorTypes } from "./error-types"

export class NotFoundError extends Error {
  constructor() {
    super('Not Found Error')
    this.name = ErrorTypes.NotFoundError
  }
}
