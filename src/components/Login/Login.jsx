import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import S from './styles.module.scss';
import { GiPadlock } from 'react-icons/gi';

export function Login() {
  return (
  <div className={S.container}>
    <section className={S.section}>
      <GiPadlock className={S.lock}/>
      <FloatingLabel className={S.input}
          id="InputLogin"
          label="Login"
          style={{outline:'none'}}
          
        >
          <Form.Control type="text" placeholder="name@example.com" id='InputLogin' style={{height:'50px', outline:'none', boxShadow:'none', border:'none' }} />
      </FloatingLabel>

      <FloatingLabel  className={S.input} id="inputPassword" label="Senha">
        <Form.Control  type="password" placeholder="password" id='inputPassword' style={{height:'50px', outline:'none', boxShadow:'none', border:'none' }}/>
      </FloatingLabel>
      <Button variant="primary" className={S.btn}>Entrar</Button>

    </section>
  </div>
  );
}
