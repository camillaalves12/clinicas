/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";

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
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>{props.description}</h6>
      </Modal.Body>
    </Modal>
  );
}
