/* eslint-disable jest/expect-expect */
import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'
import faker from 'faker'
import { ValidtionStub, AuthenticationSpy } from '@/presetation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = new ValidtionStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy}/>)
  return {
    sut,
    authenticationSpy
  }
}

const populateEmailField = (sut: RenderResult,
  email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatepasswordField = (sut: RenderResult,
  password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmint = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatepasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    afterEach(cleanup)
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show email if  validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should show password if  validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatepasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if validation sucessds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  test('Should show valid password state if validation sucessds', () => {
    const { sut } = makeSut()
    populatepasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  test('Should submit button enabled', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatepasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmint(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call autentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmint(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call autentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmint(sut)
    simulateValidSubmint(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })
})

/*
getByTestId = capitura o atributo data-testid das tag
childElementCount = verifica se o componente foi chamado retornando um inteiro
fireEvent= dispara o evento
afterEach(cleanup) = limpa o compoenente para que ele não seja alterado pelos testes
*/
