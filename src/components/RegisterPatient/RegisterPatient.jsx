import S from './styles.module.scss'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonCase from '../ButtonCase/ButtonCase'

export function RegisterPatient(props) {
    return(
        <Form className={S.container}>
            <div className={S.containerForm}>
            <h2 style={{ marginBottom:'1.5rem'}}>{props.title}</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome completo:</Form.Label>
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
                <Form.Label>CPF:</Form.Label>
                <Form.Control
                required
                className={S.inputDoctorEspc} 
                style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd' }} />
            </Form.Group>
            </div>

            
            <div className={S.divCheckSexo}>
            <Form.Group as={Row} className="mb-3 checkSexo">
                <Form.Label as="legend" column sm={2}>
                    Sexo:
                </Form.Label>

                <Col sm={10} className={S.checkSexo}>
                    <Form.Check
                    inline
                    type="radio"
                    label="Masculino"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    />
                    <Form.Check
                    inline
                    type="radio"
                    label="Feminino"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    />
                </Col>
            </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                required
                className={S.inputDoctorEspc} 
                style={{outline:'none', boxShadow:'none', border:'1px solid #cdcdcd', marginBottom:'1rem' }} />
            </Form.Group>
            
            <ButtonCase nameBtn='Cadastrar' title='Paciente Cadastrado!!'/>
            </div>
        </Form>
        

    )
}