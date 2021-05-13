import React from 'react'
import { makeLoginValidation } from './login-validation-factory'
import { Login } from '@/presetation/pages'
import { makeRemoteAuthentication } from '@/main/factories/authentication/remote-authentication-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />)
}
