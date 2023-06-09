// Bootstrap imports
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
// CSS imports
import btnStyles from "../styles/Button.module.css";

const DeleteConfirmationModal = (props) => {

  const {
    showModal,
    handleClose,
    handleEventDelete,
    handleCommentDelete,
    handleReviewDelete,
    type,
    message,
  } = props


  return (

    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      { /* Delete Modal content for deleting an event */ }
      {type === "event" && 
        <>
          <Button className={`${btnStyles.Button} ${btnStyles.Modal}`} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Delete}`} onClick = {handleEventDelete}>
            Confirm Deletion
          </Button>
        </>
      }
      { /* Delete Modal content for deleting a comment */ }
      {type === "comment" && 
        <>
          <Button className={`${btnStyles.Button} ${btnStyles.Modal}`} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Delete}`} onClick = {handleCommentDelete}>
            Confirm Deletion
          </Button>
        </>
      }
      { /* Delete Modal content for deleting a review */ }
      {type === "review" && 
        <>
          <Button className={`${btnStyles.Button} ${btnStyles.Modal}`} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Delete}`} onClick = {handleReviewDelete}>
            Confirm Deletion
          </Button>
        </>
      }
    </Modal.Footer>
  </Modal>
    )
}
 
export default DeleteConfirmationModal;