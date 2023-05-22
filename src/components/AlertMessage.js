import React from 'react'
import { Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

const AlertMessage = (props) => {
  
  const { showAlert, setShowAlert, variant, alertMessage } = props;
  

  return (
    showAlert && (
      <Container className='my-3'>
        <Alert variant={variant} onClose={() => setShowAlert(false)} className='fade' dismissible>
        <p> {alertMessage} </p>
      </Alert>
      </Container>
      
    )
  );
}

export default AlertMessage