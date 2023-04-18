import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { AuthContext } from '~/context/auth-context'
import { SnackBarContext } from '~/context/snackbar-context'
import { AuthService } from '~/services/auth-service'
import useForm from '~/hooks/use-form'
import useInputVisibility from '~/hooks/use-input-visibility'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'

import { routesPath } from '~/routes/routesPath'
import { snackbarVariants, email, password } from '~/constants/constants'
import { AuthContextInterface, SnackBarContextInterface, UserBody } from '~/types'
import { styles } from '~/components/login-form/LoginForm.styles'

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setAlert } = useContext(SnackBarContext) as SnackBarContextInterface
  const { setCurrentUser } = useContext(AuthContext) as AuthContextInterface

  const { handleSubmit, handleChange, handleBlur, data, errors } = useForm<UserBody>({
    onSubmit: async () => {
      try {
        setLoading(true)
        const res = await AuthService.login(data)
        setCurrentUser(res.data.data)
        navigate(routesPath.home.route)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setAlert({
          severity: snackbarVariants.error,
          message: e.response ? e.response.data.message : e.message
        })
      } finally {
        setLoading(false)
      }
    },
    initialValues: { email: '', password: '' },
    validations: { email, password }
  })

  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)

  return (
    <Box sx={ styles.container }>
      <Avatar sx={ styles.lockedIcon }>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component='h1' sx={ { my: 1 } } variant='h5'>
        { 'Sign In' }
      </Typography>

      <Box component='form' noValidate onSubmit={ handleSubmit }>
        <AppTextField
          autoFocus
          errorMsg={ errors.email }
          fullWidth
          label='Email'
          margin='dense'
          onBlur={ handleBlur('email') }
          onChange={ handleChange('email') }
          required
          value={ data.email }
        />

        <AppTextField
          InputProps={ passwordVisibility }
          errorMsg={ errors.password }
          fullWidth
          label='Password'
          margin='dense'
          onBlur={ handleBlur('password') }
          onChange={ handleChange('password') }
          required
          type={ showPassword ? 'text' : 'password' }
          value={ data.password }
        />

        <Link href='#' sx={ styles.forgotPassword } variant='body1'>
          { 'Forgot password?' }
        </Link>

        <AppButton
          fullWidth
          loading={ loading }
          size='large'
          sx={ styles.submitBtn }
          type='submit'
          variant='contained'
        >
          { 'Sign In' }
        </AppButton>

        <Box sx={ styles.signUpLinkContainer }>
          { 'Don`t have an account yet?' }
          <Link href={ routesPath.navBar.signUp.route } sx={ styles.signUpLink } variant='body1'>
            { 'Join us for free' }
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginForm
