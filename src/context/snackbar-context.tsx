import { FC, ReactNode, createContext, useCallback, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert, { AlertColor } from '@mui/material/Alert'

import { snackbarVariants } from '~/constants/constants'
import { SnackBarContextInterface, SnackbarOptions } from '~/types'

interface SnackBarProviderProps {
  children: ReactNode
}

export const SnackBarContext = createContext<SnackBarContextInterface | undefined>(undefined)

export const SnackBarProvider: FC<SnackBarProviderProps> = ({ children }) => {
  const [show, setShow] = useState(false)
  const [severity, setSeverity] = useState(snackbarVariants.error)
  const [message, setMessage] = useState('')
  const [duration, setDuration] = useState(0)

  const setAlert = useCallback((options: SnackbarOptions) => {
    setShow(true)
    setSeverity(options.severity)
    setMessage(options.message)
    setDuration(options.duration || 4000)
  }, [])

  const handleClose = () => {
    setShow(false)
  }

  return (
    <SnackBarContext.Provider value={ { setAlert } }>
      { children }
      <Snackbar
        anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
        autoHideDuration={ duration }
        onClose={ handleClose }
        open={ show }
      >
        <Alert severity={ severity as AlertColor } sx={ { color: 'basic.white' } } variant='filled'>
          { message }
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  )
}
