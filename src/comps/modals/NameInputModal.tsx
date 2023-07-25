import { Modal, Button } from 'react-bootstrap';
import { ModalProps } from '../../types/ModalProps'

const NameInputModal = (props: ModalProps) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Missing Character Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please enter a name for your character before proceeding.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NameInputModal;