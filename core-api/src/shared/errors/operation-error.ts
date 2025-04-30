import { ErrorTypes } from "./error-types"

export class OperationError extends Error {
  constructor() {
    super('Operation Error')
    this.name = ErrorTypes.OperationError
  }
}
