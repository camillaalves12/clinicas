import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadingStorageData = async () => {
      const storagedToken = localStorage.getItem('token') // Corrected: pass 'token' as a string
      const storagedUser = localStorage.getItem('user') // Corrected: pass 'user' as a string

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser)) // Corrected: parse storagedUser to JSON if it's a stringified object
      }
    }

    loadingStorageData()
  }, [])

  const signIn = async (email, senha) => {
    const response = await api.post('/auth', {
      email,
      senha
    })

    if (response.data.error) {
      alert(response.data.error)
    } else {
      setUser(response.data)
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`
      localStorage.setItem('token', response.data.token) // Corrected: pass 'token' as a string
      localStorage.setItem('user', JSON.stringify(response.data)) // Corrected: stringify the response.data object before storing
    }

    console.log(response)
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
