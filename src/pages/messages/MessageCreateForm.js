// React imports
import { useState } from 'react'
// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// CSS imports
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'
// Component imports
import { axiosRes } from '../../api/axiosDefaults';
import AlertMessage from '../../components/AlertMessage';

const MessageCreateForm = (props) => {

    const {sendToProfile, profileId, mobile} = props

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    // Variables to display success alert when message is sent successfully
    const [variant, setVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (event) => {
        setMessage(event.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("profile", profileId);
        formData.append("message", message);
        try {
          await axiosRes.post('/contact/', formData);
          setMessage("")
          setShowAlert(true)
          setVariant("success")
          setAlertMessage("Your message has been sent successfully")

        } catch (err) {
          // console.log(err)
          if (err.response?.status !== 401) {
            setErrors(err.response?.data);
          }
        }
    };

  return (
    <Container
      className={`${appStyles.Content} mb-3 text-center ${
        mobile && "d-lg-none"
      }`}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Send a Message to {sendToProfile}</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Type your message here"
            name="message"
            value={message}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.message?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button
          className={`${btnStyles.Button} ${btnStyles.Form}`}
          type="submit"
        >
          Send
        </Button>
      </Form>
      <AlertMessage showAlert={showAlert} setShowAlert variant={variant} alertMessage={alertMessage}/>

    </Container>
  );
}

export default MessageCreateForm