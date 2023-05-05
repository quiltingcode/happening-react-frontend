import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { EditDeleteDropdown } from './EditDeleteDropdown';

 
const DeleteConfirmationModal = (props) => {


  return (

    <Modal show={props.showModal} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>{`${props.title} sounds like an amazing event.`}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Cancel
      </Button>
      <Button onClick = {props.handleDelete} />
    </Modal.Footer>
  </Modal>
    )
}
 
export default DeleteConfirmationModal;