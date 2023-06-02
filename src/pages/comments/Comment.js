// React imports
import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom';
// CSS imports
import styles from "../../styles/Comment.module.css";
// Bootstrap imports
import Media from 'react-bootstrap/Media';
// Component imports
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import CommentEditForm from "./CommentEditForm";

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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    // Variables for dispalying the edit comment form
    const [showEditForm, setShowEditForm] = useState(false);

    // Variables for displaying the delete comment modal popup
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("")
    const handleShow = () => {
        setShow(true);
        setMessage(`Are you sure you want to delete this comment?`);
        setType("comment");
    };
    const handleClose = () => setShow(false);

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
        } catch (err) {
            console.log(err)
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
          {showEditForm ? (
            <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
            />
          ) : ( 
            <p className={styles.Comment}>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <EditDeleteDropdown handleEdit={() => setShowEditForm(true)} handleShow={handleShow} />
        )}
      </Media>
      <DeleteConfirmationModal
        showModal={show}
        handleClose={handleClose}
        handleCommentDelete={handleCommentDelete}
        type={type}
        message={message}
      />
    </div>
  );
}

export default Comment