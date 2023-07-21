import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadingStorageData = async () => {
      const storagedToken = localStorage.getItem(token)
      const storagedUser = localStorage.getItem(user)

      if (storagedToken && storagedUser) {
        setUser(storagedUser)
      }
    }

    loadingStorageData()
  }, [])

  const signIn = async (email, password) => {
    const response = await api.post('/auth', {
      email,
      password
    })

    if (response.data.error) {
      alert(response.data.error)
    } else {
      setUser(response.data)
      api.defaults.headers.common[
        Authorization
      ] = `Bearer ${response.data.token}`
      localStorage.setItem(token, response.data.token)
      localStorage.setItem(user, response.data.user)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
