import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'
import { axiosRes } from '../../api/axiosDefaults';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const MessageCreateForm = (props) => {

    const {sendToProfile, profileId, mobile} = props

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();

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
          

        } catch (err) {
          console.log(err)
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
    </Container>
  );
}

export default MessageCreateForm