import { FocusEvent, FormEvent, useState, ChangeEvent } from 'react'
import { Validations } from '~/types'

type ErrorValues<T> = {
  [key in keyof T]: string
}
type isTouched<T> = {
  [key in keyof T]: boolean
}

type FormKeys<T> = keyof T & keyof Validations

interface UseFormProps<T> {
  initialValues: T
  validations: Validations
  onSubmit: () => void
}

interface UseFormReturn<T> {
  data: T
  errors: ErrorValues<T>
  handleChange: (key: FormKeys<T>) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (key: FormKeys<T>) => (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  setData: (data: T) => void
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
  validations,
  onSubmit
}: UseFormProps<T>): UseFormReturn<T> => {
  const [data, setData] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ErrorValues<T>>(initialValues)
  const [isTouched, setTouched] = useState<isTouched<T>>({} as isTouched<T>)

  const handleChange = (key: FormKeys<T>) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [key]: event.target.value
    })
    if (isTouched[key]) {
      const valid = validations[key](event.target.value)
      setErrors({
        ...errors,
        [key]: valid
      })
    }
  }

  const handleBlur = (key: FormKeys<T>) => (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const valid = validations[key](event.target.value)
    setErrors({
      ...errors,
      [key]: valid
    })
    setTouched({
      ...isTouched,
      [key]: true
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let isValid = true
    if (validations) {
      for (const key in validations) {
        const value = data[key]
        const validation = validations[key](value)
        if (validation) {
          isValid = false
          setErrors({
            ...errors,
            [key]: validation
          })
          return
        }
      }
    }
    if (isValid) {
      onSubmit()
    }
  }

  return {
    data,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setData
  }
}

export default useForm
