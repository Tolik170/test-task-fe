import { helperTextHandler, nameField } from '~/utils/validation'

export const snackbarVariants = {
  error: 'error',
  success: 'success'
}

export const email = (value: string) => {
  return helperTextHandler(value, 'email')
}

export const password = (value: string) => {
  return helperTextHandler(value, 'password')
}

export const userName = (value: string) => {
  return nameField(value)
}
