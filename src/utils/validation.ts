import { Validations } from '~/types'

export const emptyField = (value: string, helperText: string) => {
  if (!value) {
    return 'This field cannot be empty'
  }
  return helperText
}
  
export const nameField = (value: string) => {
  return helperTextHandler(value, 'nameField')
}

export const helperTextHandler = (value: string, marker: string) => {
  return emptyField(value, validations[marker](value))
}  

const validations: Validations = {
  nameField: (value: string) => {
    if (value.length < 3) {
      return 'Username cannot be shorter than 3 characters'
    }
    if (value.length > 20) {
      return 'Username cannot be longer than 20 characters'
    }
    return ''
  },
  password: (value: string) => {
    if (!RegExp(/^(?=.*\d)(?=.*[a-zа-яєії])\S+$/i).test(value)) {
      return 'Password must contain alphabetic and numeric character'
    }
    if (value.length < 8) {
      return 'Password cannot be shorter than 8 characters'
    }
    if (value.length > 20) {
      return 'Password cannot be longer than 20 character'
    }
    return ''
  },
  email: (value: string) => {
    if (!RegExp(/^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i).test(value)) {
      return 'Email should be of the following format: “local-part@domain.com”'
    }
    return ''
  }
}
