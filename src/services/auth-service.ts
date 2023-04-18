import { axiosClient } from '~/plugins/axiosClient'
import { UserBody } from '~/types'

export const AuthService = {
  login: (userData: UserBody) => {
    return axiosClient.post('/auth/sign-in', userData)
  },
  signUp: (userData: UserBody) => {
    return axiosClient.post('/auth/sign-up', userData)
  },
  logout: () => {
    return axiosClient.post('/auth/logout')
  }
}
