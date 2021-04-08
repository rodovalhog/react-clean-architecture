import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presetation/components'
import Context from '@/presetation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const {
    errorState: { main },
    state: { isLoading }
  } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner} />}
      {main && <span className={Styles.error}>main</span>}
    </div>
  )
}

export default FormStatus
