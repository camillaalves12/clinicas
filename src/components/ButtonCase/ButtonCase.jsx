import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import S from './styles.module.scss'

function ButtonCase(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={S.containerBtn}>
      <Button variant="primary" onClick={handleShow} className={S.buttonCase} type='reset'>
        {props.nameBtn}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {props.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>Pode prosseguir para o painel administrativo.</Modal.Body>
      </Modal>
    </div>
  );
}

export default ButtonCase;