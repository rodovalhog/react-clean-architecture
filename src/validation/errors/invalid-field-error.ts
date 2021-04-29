export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`Campo ${fieldName} invalido`)
  }
}
