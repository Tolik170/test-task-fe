import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { AuthService } from '~/services/auth-service'
import { SnackBarContext } from '~/context/snackbar-context'
import useForm from '~/hooks/use-form'
import useInputVisibility from '~/hooks/use-input-visibility'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'

import { routesPath } from '~/routes/routesPath'
import { userName, email, password, snackbarVariants } from '~/constants/constants'
import { SnackBarContextInterface, UserBody } from '~/types'
import { styles } from '~/components/login-form/LoginForm.styles'

const SignUpForm = () => {
  const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setAlert } = useContext(SnackBarContext) as SnackBarContextInterface

  const { handleSubmit, handleChange, handleBlur, data, errors } = useForm<UserBody>({
    onSubmit: async () => {
      try {
        setLoading(true)
        await AuthService.signUp(data)
        navigate(routesPath.navBar.login.route)
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
    initialValues: { userName: '', email: '', password: '' },
    validations: { userName, email, password }
  })

  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)

  const handleOnAgreementChange = () => {
    setIsAgreementChecked((prev) => !prev)
  }

  const isValid = useMemo(
    () => Object.values(errors).every((elem) => elem === '') && Object.values(data).every((elem) => elem !== ''),
    [data, errors]
  )

  return (
    <Box sx={ styles.container }>
      <Avatar sx={ styles.lockedIcon }>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component='h1' sx={ { my: 1 } } variant='h5'>
        { 'Sign Up' }
      </Typography>

      <Box component='form' noValidate onSubmit={ handleSubmit }>
        <AppTextField
          autoFocus
          errorMsg={ errors.userName }
          fullWidth
          label='Username'
          margin='dense'
          onBlur={ handleBlur('userName') }
          onChange={ handleChange('userName') }
          required
          value={ data.userName }
        />

        <AppTextField
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
          // sx={ { mb: 2 } }
          type={ showPassword ? 'text' : 'password' }
          value={ data.password }
        />

        <FormControlLabel
          control={ <Checkbox sx={ { color: 'primary.500' } } /> }
          label='I agree to the Terms and Privacy Policy.'
          onChange={ handleOnAgreementChange }
          sx={ { color: 'primary.700' } }
          value={ isAgreementChecked }
        />

        <AppButton
          disabled={ !isValid || !isAgreementChecked }
          fullWidth
          loading={ loading }
          sx={ styles.submitBtn }
          type='submit'
        >
          { 'Sign up' }
        </AppButton>

        <Box sx={ styles.signUpLinkContainer }>
          { 'Already have an account?' }
          <Link href={ routesPath.navBar.login.route } sx={ styles.signUpLink } variant='body1'>
            { 'Sign in' }
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpForm
