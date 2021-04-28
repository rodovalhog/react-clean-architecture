import { RequiredFieldValidation } from '@/validation/required-field/required-field-validation'
import { RequiredFieldError } from '@/validation/errors'

describe('RequiredFieldValidation', () => {
  test('Should return error if filed is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
