import { useContext, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import S from './styles.module.scss'
import { GiPadlock } from 'react-icons/gi'
import { AuthContext } from '../../context/auth'
import { Navigate } from 'react-router-dom'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signed } = useContext(AuthContext)

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSignIn = async e => {

    await signIn(email, password)
  }

  if (signed) {
    return <Navigate to="/initial" />
  } else {
    return (
      <div className={S.container}>
        <section className={S.section}>
          <GiPadlock className={S.lock} />
          <FloatingLabel
            className={S.input}
            id="InputLogin"
            label="Login"
            style={{ outline: 'none' }}
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              id="InputLogin"
              style={{
                height: '50px',
                outline: 'none',
                boxShadow: 'none',
                border: 'none'
              }}
              value={email}
              onChange={handleEmailChange}
            />
          </FloatingLabel>

          <FloatingLabel className={S.input} id="inputPassword" label="Senha">
            <Form.Control
              type="password"
              placeholder="password"
              id="inputPassword"
              style={{
                height: '50px',
                outline: 'none',
                boxShadow: 'none',
                border: 'none'
              }}
              value={password}
              onChange={handlePasswordChange}
            />
          </FloatingLabel>
          <Button type='submit' variant="primary" className={S.btn} onClick={handleSignIn}>
            Entrar
          </Button>
        </section>
      </div>
    )
  }
}
