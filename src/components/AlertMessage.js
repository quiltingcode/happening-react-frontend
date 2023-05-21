import React from 'react'
import Alert from 'react-bootstrap/Alert';

const AlertMessage = (props) => {
  
  const { showAlert, setShowAlert, variant, alertMessage } = props;
  

  return (
    showAlert && (
      <Alert variant={variant} onClose={() => setShowAlert(false)} className='fade' dismissible>
        <p> {alertMessage} </p>
      </Alert>
    )
  );
}

export default AlertMessage