import { Validation } from '@/presetation/protocols/validation'

export class ValidtionStub implements Validation {
  errorMessage: string

  validate (fieldName: string, fieldValue: string): string {
    return this.errorMessage
  }
}
