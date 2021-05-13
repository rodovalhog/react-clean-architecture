import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Input from './input'
import Context from '@/presetation/contexts/form/form-context'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOlny', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOlny on focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
