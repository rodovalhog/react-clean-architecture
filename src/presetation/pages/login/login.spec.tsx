import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'
import faker from 'faker'
import { Validation } from '@/presetation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidtionSpy
}
class ValidtionSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidtionSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    afterEach(cleanup)
    const { sut } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatorio')
    expect(emailStatus.textContent).toBe('🏀')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatorio')
    expect(passwordStatus.textContent).toBe('🏀')
  })

  test('Should call validation with correct value', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const emailFaker = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: emailFaker } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(emailFaker)
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('password')
    const passwordFaker = faker.internet.password()
    fireEvent.input(emailInput, { target: { value: passwordFaker } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(passwordFaker)
  })
})

/*
getByTestId = capitura o atributo data-testid das tag
childElementCount = verifica se o componente foi chamado retornando um inteiro
fireEvent= dispara o evento
afterEach(cleanup) = limpa o compoenente para que ele não seja alterado pelos testes
*/
