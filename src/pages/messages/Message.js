import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import Media from 'react-bootstrap/Media';
import { Button } from 'react-bootstrap';
import btnStyles from '../../styles/Button.module.css'
import MessageReplyForm from './MessageReplyForm';


const Message = (props) => {

    const { 
      profile_id, 
      profile_image, 
      created_at, 
      message, 
      owner 
    } = props;

    const [show, setShow] = useState(false);
    const handleShow = () => {
      setShow(true);
    };
    const handleClose = () => setShow(false);

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
      <MessageReplyForm profile_id={profile_id} showModal={show} handleClose={handleClose} />
    </div>
  )
}

export default Message