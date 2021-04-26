import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presetation/components'
import Context from '@/presetation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const {
    state: { isLoading, mainError }
  } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span data-testid="main-error" className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
