import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import btnStyles from "../styles/Button.module.css";

const DeleteConfirmationModal = (props) => {

  const {
    showModal,
    handleClose,
    title,
    handleDelete,
  } = props

  return (

    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>{`Do you really want to delete ${title}? Sounds like an amazing event.`}</Modal.Body>
    <Modal.Footer>
      <Button className={`${btnStyles.Button} ${btnStyles.Modal}`} onClick={handleClose}>
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Delete}`} onClick = {handleDelete}>
        Confirm Deletion
      </Button>
    </Modal.Footer>
  </Modal>
    )
}
 
export default DeleteConfirmationModal;