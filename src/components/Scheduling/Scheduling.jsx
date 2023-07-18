import S from './styles.module.scss'
import {Header} from '../../components/Header/Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function Scheduling(props) {
   return(
      <>
      <Header/>
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
               <Form.Label>Data do prodecimento:</Form.Label>
               <Form.Control
               required
               className={S.inputDoctor} 
               type="date" 
               style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd' }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Profissional:</Form.Label>
               <Form.Control
               required
               className={S.inputDoctorEspc} 
               style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd' }} />
            </Form.Group>
               </div>
               <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Procedimento:</Form.Label>
               <Form.Control
               required
               className={S.input} 
               type="text" 
               style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd' }} />
            </Form.Group>

         <div className={S.btnSearch}>

         <Button style={{width:'250px', height:'38px',textAlign:'center'}}>Procurar</Button>
         </div>
         </div>
      </Form>
      
      </>
   )
}
