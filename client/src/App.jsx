import './App.scss'
import { AuthProvider } from './context/auth'
import { AppRouter } from './routes'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
