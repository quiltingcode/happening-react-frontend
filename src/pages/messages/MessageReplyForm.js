// React imports
import { useState } from 'react'
// Bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ModalFooter from "react-bootstrap/ModalFooter";
// CSS imports
import btnStyles from '../../styles/Button.module.css'
// Component imports
import { axiosRes } from '../../api/axiosDefaults';

const MessageReplyForm = (props) => {

    const {profile_id, owner, showModal, handleClose, handleAlert} = props

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
      setMessage(event.target.value);
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("profile", profile_id);
        formData.append("message", message);
        try {
          await axiosRes.post('/contact/', formData);
          handleAlert()
          
            handleClose();
        } catch (err) {
          // console.log(err)
          if (err.response?.status !== 401) {
            setErrors(err.response?.data);
          }
        }
    };

  return (
    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Reply to {owner}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col className="py-2 mx-auto text-center" md={6}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Control
                placeholder="Write your reply here"
                as="textarea"
                rows={4}
                name="message"
                value={message}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.message?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <ModalFooter>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Form}`}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Form}`}
                type="submit"
                onClick={handleSubmit}
              >
                Send
              </Button>
            </ModalFooter>
          </Form>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
  )
}

export default MessageReplyForm