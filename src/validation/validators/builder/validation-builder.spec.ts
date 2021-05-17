import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import faker from 'faker'
describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.random.word()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('Should return EmailValidation', () => {
    const fieldName = faker.random.word()

    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  test('Should return MinLengthValidation', () => {
    const fieldName = faker.random.word()
    const minChar = faker.datatype.number()

    const validations = sut.field(fieldName).min(minChar).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, minChar)])
  })

  test('Should return a list of validations', () => {
    const fieldName = faker.random.word()
    const minChar = faker.datatype.number()
    const validations = sut.field(fieldName).required().min(minChar).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, minChar),
      new EmailValidation(fieldName)])
  })
})
