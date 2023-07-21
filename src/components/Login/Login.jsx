import { useState } from 'react'
import axios from 'axios'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import S from './styles.module.scss'
import { GiPadlock } from 'react-icons/gi'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [sucessMessage, setSucessMessage] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    const loginData = {
      email: email,
      senha: password
    }

    axios
      .post('http://localhost:3030/auth', loginData)
      .then(response => {
        // Verifica se a resposta tem a propriedade 'error'
        if (response.data.error) {
          setError(response.data.error)
          setSucessMessage('')
        } else {
          // Caso contrário, trata como login bem-sucedido
          setError('')
          setSucessMessage('Login bem-sucedido!')
          console.log('Login bem-sucedido!', response.data)
        }
      })
      .catch(error => {
        // Trate os erros aqui
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error)
        } else {
          setError(
            'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.'
          )
        }
      })
  }

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
        <Button variant="primary" className={S.btn} onClick={handleLogin}>
          Entrar
        </Button>
        {error && <div className={S.error}>{error}</div>}
        {sucessMessage && <div className={S.sucess}>{sucessMessage}</div>}
      </section>
    </div>
  )
}
