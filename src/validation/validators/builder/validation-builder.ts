import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'
import { EmailValidation } from '../email/email-validation'
import { MinLengthValidation } from '../min-length/min-length-validation'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly length: number,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, 0, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
