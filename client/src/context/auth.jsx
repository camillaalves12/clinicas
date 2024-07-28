import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import Refresh from '../components/Refresh/Refresh'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadingStorageData()

    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    
  }, [])

  const loadingStorageData = async () => {
    const storagedToken = localStorage.getItem('token')
    const storagedUser = localStorage.getItem('user')

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
    }

    setLoading(false)
  }

  if (loading) {
    return <Refresh />
  }

  const signIn = async (email, senha) => {
    const response = await api.post('/auth', {
      email,
      senha
    })

    if (response.data.error) {
      alert(response.data.error)
    } else {
      setUser(response.data)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
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
