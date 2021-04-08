import React, { useState } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  Header,
  Input,
  FormStatus
} from '@/presetation/components'
import Context from '@/presetation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatorio',
    password: 'Campo obrigatorio',
    main: ''
  })
  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{
        state,
        errorState
      }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite sua e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
