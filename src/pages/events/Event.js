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
            {tags && <Card.Text className={styles.Tags}>{tags}</Card.Text>}
            <div>
                {is_owner ? (
                    /* First check if the logged in user created the event */
                    <OverlayTrigger placement='top' overlay={<Tooltip>You can't be interested in your own event, sorry!</Tooltip>}>
                        <i className="fa-regular fa-eye"></i>
                    </OverlayTrigger>
                    /* If yes, can't do anything. If no, check if they've already posted interested */
                ) : interested_id ? (
                    /* If already has interested_id, full face */
                    <span onClick={() => {}}>
                        <i className={`fa-solid fa-eye ${styles.Smile}`}></i>
                    </span>
                    /* If no interested_id, check if user logged in. if yes, empty face */
                ) : currentUser ? (
                    <span onClick={() => {}}>
                        <i className={`fa-regular fa-eye ${styles.SmileOutline}`}></i>
                    </span>
                ) : (
                    /* If not logged, message to log in, with emtpy face */
                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to show your interest!</Tooltip>}>
                        <i className="fa-regular fa-eye"></i>
                    </OverlayTrigger>
                    
                )}
                {interested_count}

                {is_owner ? (
                    /* First check if the logged in user created the event */
                    <OverlayTrigger placement='top' overlay={<Tooltip>You can't go to your own event, sorry!</Tooltip>}>
                        <i className="far fa-calendar-check"></i>
                    </OverlayTrigger>
                    /* If yes, can't do anything. If no, check if they've already posted going */
                ) : going_id ? (
                    /* If already has going_id, full face */
                    <span onClick={() => {}}>
                        <i className={`fas fa-calendar-check ${styles.Calendar}`}></i>
                    </span>
                    /* If no going_id, check if user logged in. if yes, empty face */
                ) : currentUser ? (
                    <span onClick={() => {}}>
                        <i className={`far fa-calendar-check ${styles.CalendarOutline}`}></i>
                    </span>
                ) : (
                    /* If not logged, message to log in, with emtpy face */
                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to show you're going!</Tooltip>}>
                        <i className="far fa-calendar-check"></i>
                    </OverlayTrigger>
                    
                )}
                {going_count}

                
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