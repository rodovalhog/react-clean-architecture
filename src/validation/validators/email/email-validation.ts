import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidtion implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    return new InvalidFieldError(value)
  }
}
