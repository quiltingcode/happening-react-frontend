import React from 'react'
import Alert from 'react-bootstrap/Alert';

const AlertMessage = (props) => {
  
  const { variant, alertMessage, showAlert, setShowAlert } = props;

  return (
    showAlert && (
      <Alert variant={variant} onClose={() => setShowAlert(false)} dismissible>
        <p> {alertMessage} </p>
      </Alert>
    )
  );
}

export default AlertMessage