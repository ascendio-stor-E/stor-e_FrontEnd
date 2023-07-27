import { Modal, Button } from 'react-bootstrap';
import { DeleteModelProp } from '../../types/DeleteModelProp';

const DeleteItemModal = (props: DeleteModelProp) => {
  return (
    <Modal show={props.show} onHide={props.onClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Storybook</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this Storybook?</Modal.Body>
      <Modal.Footer>
        <Button  variant="info" onClick={props.onClose}>
          Cancel
        </Button>
        <Button  className='btn-danger' variant="danger" onClick={props.onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItemModal;
