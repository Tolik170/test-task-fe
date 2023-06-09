import { FC } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

import Loader from '~/components/loader/Loader'

interface AppButtonProps extends ButtonProps {
  loading?: boolean,
  disabled?: boolean
  }

const AppButton: FC<AppButtonProps> = ({
  children,
  loading,
  disabled,
  variant = 'contained',
  size = 'large',
  ...props
}) => {
  const loader = <Loader size={ 26.5 } sx={ { opacity: '0.6', color: 'basic.black' } } />

  return (
    <Button
      disabled={ loading || disabled } size={ size } variant={ variant }
      { ...props }
    >
      { loading ? loader : children }
  
    </Button>
  )
}

export default AppButton
