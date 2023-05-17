import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'


const MessageCreateForm = (props) => {

    const {sendToProfile, mobile} = props

  return (
    <Container className={`${appStyles.Content} mb-3 ${mobile && 'd-lg-none text-center'}`}>
      <Form>
        <Form.Group>
          <Form.Label>Send a Message to {sendToProfile}</Form.Label>
          <Form.Control 
            as="textarea"
            rows={2} 
            placeholder="Type your message here" 
          />
        </Form.Group>

        <Button className={`${btnStyles.Button} ${btnStyles.Form}`} type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default MessageCreateForm