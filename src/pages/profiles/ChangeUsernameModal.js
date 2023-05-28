import { useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";

import { useHistory} from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";


const ChangeUsernameModal = (props) => {

  const {
    showModal,
    handleClose,
  } = props

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const setCurrentUser = useSetCurrentUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Username</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="py-2 mx-auto text-center" md={6}>
            <Form onSubmit={handleSubmit} className="my-2">
              <Form.Group>
                <Form.Label className="mb-3">Choose a new username:</Form.Label>
                <Form.Control
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              {errors?.username?.map((message, idx) => (
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
                  Save
                </Button>
              </ModalFooter>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
 
export default ChangeUsernameModal;