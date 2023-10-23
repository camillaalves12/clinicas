import { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
  const { signed } = useContext(AuthContext)

  if (!signed) {
    console.log('Não está logado')

    return <Navigate to="/" />
  }

  console.log('Está logado')
  return <Outlet />
}
