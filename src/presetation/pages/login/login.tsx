import Logo from '@/presetation/components/logo/logo'
import Spinner from '@/presetation/components/spinner/spinner'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquentes para programadores</h1>
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite sua senha" />
          <span className={Styles.status}>🏀</span>
        </div>

        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={Styles.status}>🏀</span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>
            Error
          </span>
        </div>
      </form>
      <footer className={Styles.footer}> b </footer>
    </div>
  )
}

export default Login
