import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import Media from 'react-bootstrap/Media';
import { Button } from 'react-bootstrap';
import btnStyles from '../../styles/Button.module.css'


const Message = (props) => {

    const { 
      profile_id, 
      profile_image, 
      created_at, 
      message, 
      owner 
    } = props;

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
        <Button className={`${btnStyles.Reply} btn-sm`}>Reply</Button>
      </Media>
    </div>
  )
}

export default Message