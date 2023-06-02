// React imports
import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// Component imports
import Avatar from '../../components/Avatar';
import MessageReplyForm from './MessageReplyForm';
import AlertMessage from '../../components/AlertMessage';
// Bootstrap imports
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
// CSS imports
import btnStyles from '../../styles/Button.module.css'

const Message = (props) => {

    const { 
      profile_id, 
      profile_image, 
      created_at, 
      message, 
      owner 
    } = props;

    // Variables to display success alert when message is sent successfully
    const [show, setShow] = useState(false);
    const handleShow = () => {
      setShow(true);
    };
    const handleClose = () => setShow(false);
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlert = () => {
      setShowAlert(true);
      setVariant("success")
      setAlertMessage("Your reply has been sent successfully")
    }

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={45} />
        </Link>
        <Media.Body>
          <span><strong>{owner}, {created_at}</strong> </span>
          <p>{message}</p>
        </Media.Body> 
        <Button 
          className={`${btnStyles.Reply} btn-sm`}
          onClick={handleShow}
        >
          Reply
        </Button>
      </Media>
      <AlertMessage showAlert={showAlert} setShowAlert variant={variant} alertMessage={alertMessage}/>
      <MessageReplyForm profile_id={profile_id} owner={owner} showModal={show} handleClose={handleClose} handleAlert={handleAlert} />
    </div>
  )
}

export default Message