export function isNotError<T>(value: T | Error): value is T {
  return !(value instanceof Error);
}