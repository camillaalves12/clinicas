import S from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export function Confirm(props) {
   return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cadastro feito
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
          Profissional Registrado com sucesso!
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button color='dark' onClick={props.onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
}