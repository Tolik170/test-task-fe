import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { AuthContextInterface, UserResponse } from '~/types'

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

interface AuthContextProvider {
    children: ReactNode
}

export const AuthContextProvider: FC<AuthContextProvider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={ { currentUser, setCurrentUser } }>
      { children }
    </AuthContext.Provider>
  )
}
