import S from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ResultFound } from '../ResultFound/ResultFound';
import { ResultNotFound } from '../ResultNotFound/ResultNotFound';

export function SearchPatient(props){
   return(
      <>
      <Form className={S.container}>
         <div className={S.containerForm}>
            <h2 style={{ marginBottom:'1.5rem'}}>{props.title}</h2>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nome/CPF:</Form.Label>
                  <Form.Control
                  required
                  type="text" 
                  style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd' }} />
               </Form.Group>

               <div className={S.date_nasc}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Data de nascimento:</Form.Label>
                     <Form.Control
                     required
                     className={S.inputDoctor} 
                     type="date" 
                     style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd' }} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Telefone:</Form.Label>
                     <Form.Control
                     required
                     className={S.inputDoctorEspc} 
                     style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd' }} />
                  </Form.Group>
               </div>

               <div className={S.btnSearch}>
               < Button style={{width:'250px', height:'38px',textAlign:'center'}}>Procurar</Button>
            </div>
         </div>
      </Form>

      <ResultFound />
      <ResultNotFound />
      </>
   )
}