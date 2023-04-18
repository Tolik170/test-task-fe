import { useState, useEffect, useCallback, useContext } from 'react'
import { AxiosError, AxiosResponse } from 'axios'

import { SnackBarContext } from '~/context/snackbar-context'
import { SnackBarContextInterface } from '~/types'
import { snackbarVariants } from '~/constants/constants'

type ErrorResponse = {
  code: string
  message?: string
  status: number
}

interface UseAxiosProps<T, U> {
  service: (data?: U) => Promise<AxiosResponse<T>>
  fetchOnMount?: boolean
  clearResponse?: boolean
}

interface UseAxiosReturn<T, U> {
  response: T | []
  error: AxiosError<ErrorResponse> | null
  loading: boolean
  fetchData: (data?: U) => void
}

const useAxios = <T, U>({
  service,
  fetchOnMount = true,
  clearResponse = false
}: UseAxiosProps<T, U>): UseAxiosReturn<T, U> => {
  const [response, setResponse] = useState<T | []>([])
  const [error, setError] = useState<AxiosError<ErrorResponse> | null>(null)
  const [loading, setLoading] = useState<boolean>(fetchOnMount)
  const { setAlert } = useContext(SnackBarContext) as SnackBarContextInterface

  const fetchData = useCallback(
    async (data?: U) => {
      try {
        clearResponse && setResponse([])
        setLoading(true)
        const res = await service(data)
        setResponse(res?.data)
        setError(null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const err = e.response ? e.response : e
        setError(err)
        setAlert({
          severity: snackbarVariants.error,
          message: err.message || err.statusText
        })
      } finally {
        setLoading(false)
      }
    },
    [service, clearResponse, setAlert]
  )

  useEffect(() => {
    if (fetchOnMount) {
      fetchData()
    }
  }, [fetchData, fetchOnMount])

  return { response, error, loading, fetchData }
}

export default useAxios
