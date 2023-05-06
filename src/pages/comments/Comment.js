import React from 'react';
import styles from "../../styles/Comment.module.css";
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const Comment = (props) => {

    const {
        profile_id, 
        profile_image, 
        owner, 
        updated_at, 
        content,
        id,
        setEvent,
        setComments,
        handleShow,
        show,
        handleClose,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleCommentDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`)
            setEvent(prevEvent => ({
                results: [
                    {
                    ...prevEvent.results[0],
                    comments_count: prevEvent.results[0].comments_count - 1
                    },
                ],
            }));

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (error) {
            
        }
    };

  return (
    <div>
        <hr />
        <Media>
            <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={45} />
            </Link>
            <Media.Body>
                <span className={styles.Username}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
                <p className={styles.Comment}>{content}</p>
            </Media.Body>
            {is_owner && (
                <EditDeleteDropdown handleEdit={() => {}} handleShow={handleShow} />
            )}
        </Media>
        <DeleteConfirmationModal showModal={show} handleClose = {handleClose} handleCommentDelete = {handleCommentDelete} type="comment" />
    </div>
  )
}

export default Comment