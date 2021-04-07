import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presetation/components'
import Context from '@/presetation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>Error</span>}
    </div>
  )
}

export default FormStatus
