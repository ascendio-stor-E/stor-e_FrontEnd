import { Modal, Button } from 'react-bootstrap';
import { ModalProps } from '../../types/ModalProps';

const OptionSelectModal = (props: ModalProps) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Missing Character Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your adventure awaits, please select an option!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OptionSelectModal;
