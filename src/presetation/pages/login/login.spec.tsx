/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import 'jest-localstorage-mock'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Login from './login'
import { ValidtionStub, AuthenticationSpy } from '@/presetation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = new ValidtionStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy}/>
    </Router>
  )
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

const simulateValidSubmint = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatepasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const errorWrapChildCount = (
  sut: RenderResult,
  count: number
): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(submitButton.disabled).toBe(isDisabled)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    afterEach(cleanup)
    beforeEach(() => {
      localStorage.clear()
    })
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    errorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show email if  validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password if  validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatepasswordField(sut)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if validation sucessds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  test('Should show valid password state if validation sucessds', () => {
    const { sut } = makeSut()
    populatepasswordField(sut)
    testStatusForField(sut, 'password')
  })

  test('Should submit button enabled', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatepasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmint(sut)
    testElementExists(sut, 'spinner')
  })

  test('Should call autentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmint(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call autentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmint(sut)
    await simulateValidSubmint(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmint(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present errr if Athentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmint(sut)
    testElementText(sut, 'main-error', error.message)
    errorWrapChildCount(sut, 1)
  })

  test('Should add accessToken to localstorage on sucess', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmint(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})

// eslint-disable-next-line jest/no-commented-out-tests
/**
 Para rodar apenas um teste eu tenho o
 test.only()
*/

/*
getByTestId = capitura o atributo data-testid das tag
childElementCount = verifica se o componente foi chamado retornando um inteiro
fireEvent= dispara o evento
afterEach(cleanup) = limpa o compoenente para que ele não seja alterado pelos testes
*/
