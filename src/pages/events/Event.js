import React from 'react'
import styles from '../../styles/Event.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';

const Event = (props) => {

    const {
        id,
        owner, 
        profile_id,
        profile_image,
        comments_count,
        interested_count,
        going_count,
        interested_id,
        going_id,
        title,
        description,
        event_date,
        category,
        tags,
        image,
        updated_at,
        eventPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

  return (
    <Card className={styles.Event}>
        <Card.Body>
            <Media className='align-items-center justify-content-between'>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div className='d-flex align-items-center'>
                    <span>{updated_at}</span>
                    {is_owner && eventPage && "..." }
                </div>
            </Media>
        </Card.Body>
        <Link to={`/events/${id}`}>
            <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
            {title && event_date && <Card.Title className='text-center'>{title} - {event_date}</Card.Title> } 
            {description && <Card.Text>{description}</Card.Text>}
            <div>
                {is_owner ? (
                    <OverlayTrigger placement='top' overlay={<Tooltip>You can't be interested in your own event, sorry!</Tooltip>}>
                        <i className="fa-thin fa-face-grin-wide"></i>
                    </OverlayTrigger>
                ) : interested_id ? (
                    <span onClick={() => {}}>
                        <i className={`fa-duotone fa-face-grin-wide ${styles.Interested}`} ></i>
                    </span>
                ) : currentUser ? (
                    <span onClick={() => {}}>
                        <i className={`fa-duotone fa-face-grin-wide ${styles.NotInterested}`} ></i>
                    </span>
                ) : (
                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to show your interest!</Tooltip>}>
                        <i className="fa-thin fa-face-grin-wide"></i>
                    </OverlayTrigger>
                    
                )}
                {interested_count}
                
                <Link to={`/events/${id}`}>
                    <i className='far fa-comments'></i>
                </Link>
                {comments_count}
            </div>
        </Card.Body>
    </Card>
  )
}

export default Event