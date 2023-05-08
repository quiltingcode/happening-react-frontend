import React, { useState } from 'react'
import styles from '../../styles/Event.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

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
        tags,
        image,
        updated_at,
        eventPage,
        setEvents,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("")
    const handleShow = () => {
        setShow(true);
        setMessage(`Are you sure you want to delete ${title}? It could be an amazing event...`);
        setType("event");
    };

    const handleClose = () => setShow(false);

    // const [showAlert, setShowAlert] = useState(false)
    // const [confirmEventMessage, setConfirmEventMessage] = useState(null);


    const handleEdit = async () => {
        history.push(`/events/${id}/edit`)
    }

    const handleEventDelete = async () => {
        try{
            await axiosRes.delete(`/events/${id}/`)
            history.goBack()
            // setShowAlert(true)
            // setConfirmEventMessage(`The event '${title}' was deleted successfully.`);

        } catch(err){
            console.log(err)
        }
    }


    const handleInterested = async () => {
        try {
            const { data } = await axiosRes.post('/interested/', {event: id});
            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                    ? {...event, interested_count: event.interested_count + 1, interested_id: data.id}
                    : event;
                })
            }))
        } catch (err) {
            console.log(err);
        }
    };

    const handleGoing = async () => {
        try {
            const { data } = await axiosRes.post('/going/', {event: id});
            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                    ? {...event, going_count: event.going_count + 1, going_id: data.id}
                    : event;
                })
            }))
        } catch (err) {
            console.log(err);
        }
    };

    const handleNotInterested = async () => {
        try {
            await axiosRes.delete(`/interested/${interested_id}`);

            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                    ? {...event, interested_count: event.interested_count - 1, interested_id: null}
                    : event;
                })
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleNotInterestedGoing = async () => {
        try {
            await axiosRes.delete(`/interested/${interested_id}`);

            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                    ? {...event, interested_count: event.interested_count - 1, interested_id: null}
                    : event;
                })
            }))
            handleGoing();
        } catch (err) {
            console.log(err)
        }
    }

    const handleNotGoing = async () => {
        try {
            await axiosRes.delete(`/going/${going_id}`);
            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                    ? {...event, going_count: event.going_count - 1, going_id: null}
                    : event;
                })
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleNotGoingInterested = async () => {
        try {
            await axiosRes.delete(`/going/${going_id}`);
            setEvents((prevEvents) => ({
                ...prevEvents,
                results: prevEvents.results.map((event) => {
                    return event.id === id
                    ? {...event, going_count: event.going_count - 1, going_id: null}
                    : event;
                })
            }))
            handleInterested()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <>
    {/* {confirmEventMessage && 
        <Alert variant="success">{confirmEventMessage}</Alert>
    }
         */}
        <Card className={styles.Event}>
            <Card.Body>
            
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span>
                        {is_owner && eventPage && <EditDeleteDropdown 
                            handleEdit={handleEdit} 
                            handleShow={handleShow}
                        /> 
                        }
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/events/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && event_date && <Card.Title className={`text-center ${styles.Title}`}>{title} - {event_date}</Card.Title> } 
                {description && <Card.Text>{description}</Card.Text>}
                {tags && <Card.Text className={styles.Tags}><i className="fal fa-hashtag"></i>{tags}</Card.Text>}
                <div>
                    {is_owner ? (
                        /* First check if the logged in user created the event */
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can't be interested in your own event, sorry!</Tooltip>}>
                            <i className="fa-regular fa-eye"></i>
                        </OverlayTrigger>
                        /* If yes, can't do anything. If no, check if they've already posted going */
                    ) : going_id ? (
                        <span onClick={handleNotGoingInterested}>
                        <i className="fa-regular fa-eye"></i>
                        </span>
                        /* If yes, delete the going. If no, check if they've already posted interested */
                    ) : interested_id ? (
                        /* If already has interested_id, empty face - remove interest */
                        <span onClick={handleNotInterested}>
                            <i className="fa-solid fa-eye"></i>
                        </span>
                        /* If no interested_id, check if user logged in. if yes, fill face */
                    ) : currentUser ? (
                        <span onClick={handleInterested}>
                            <i className="fa-regular fa-eye"></i>
                        </span>
                    ) : (
                        /* If not logged, message to log in, with emtpy face */
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to show your interest!</Tooltip>}>
                            <i className="fa-regular fa-eye"></i>
                        </OverlayTrigger>
                        
                    )}
                    <span className='mr-2'>{interested_count}</span>

                    {is_owner ? (
                        /* First check if the logged in user created the event */
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can't go to your own event, sorry!</Tooltip>}>
                            <i className="far fa-calendar-check"></i>
                        </OverlayTrigger>
                        /* If yes, can't do anything. If no, check if they've already posted going */
                    ) : interested_id ? (
                        <span onClick={handleNotInterestedGoing}>
                        <i className="far fa-calendar-check"></i>
                        </span>
                    ) : going_id ? (
                        /* If already has going_id, full face */
                        <span onClick={handleNotGoing}>
                            <i className="fas fa-calendar-check"></i>
                        </span>
                        /* If no going_id, check if user logged in. if yes, empty face */
                    ) : currentUser ? (
                        <span onClick={handleGoing}>
                            <i className="far fa-calendar-check"></i>
                        </span>
                    ) : (
                        /* If not logged, message to log in, with emtpy face */
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to show you're going!</Tooltip>}>
                            <i className="far fa-calendar-check"></i>
                        </OverlayTrigger>
                        
                    )}
                    <span className='mr-2'>{going_count}</span>
                    
                    <Link to={`/events/${id}`}>
                        <i className='far fa-comments'></i>
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
        <DeleteConfirmationModal showModal={show} handleClose = {handleClose} handleEventDelete = {handleEventDelete} type={type} message={message} />
    </>
    
    
  )
}

export default Event