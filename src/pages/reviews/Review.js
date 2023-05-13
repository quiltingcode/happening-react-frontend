import React, { useState } from 'react'
import styles from '../../styles/Event.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';


import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const Review = (props) => {

    const {
        id,
        owner, 
        profile_id,
        profile_image,
        title,
        event_date,
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
        setMessage(`Are you sure you want to delete ${title}? All reviews are really appreciated...`);
        setType("review");
    };

    const handleClose = () => setShow(false);

    // const [showAlert, setShowAlert] = useState(false)
    // const [confirmReviewMessage, setConfirmReviewMessage] = useState(null);


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


  return (
    <>
        <Card className={styles.Event}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                    </Link>
                </Media>
            </Card.Body>
            <Link to={`/events/${id}`}>
                <Card.Body>
                    {title && event_date && <Card.Title className={`text-center ${styles.Title}`}>{title} - {event_date}</Card.Title> } 
                </Card.Body>
            </Link>
            
        </Card>
        <DeleteConfirmationModal showModal={show} handleClose = {handleClose} handleEventDelete = {handleEventDelete} type={type} message={message} />
    </>
    
    
  )
}

export default Review