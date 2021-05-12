import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('Should return MinLengthValidation', () => {
    const field = 'any_field'
    const minChar = 5
    const validations = sut.field(field).min(minChar).build()
    expect(validations).toEqual([new MinLengthValidation(field, minChar)])
  })
})
