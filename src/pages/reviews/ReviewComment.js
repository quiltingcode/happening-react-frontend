import React, { useState } from 'react'

import styles from "../../styles/Comment.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import Media from 'react-bootstrap/Media';
import { Rating } from "react-simple-star-rating";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import ReviewEditForm from './ReviewEditForm';

const ReviewComment = (props) => {

  const { 
    profile_id,
    profile_image,
    owner, 
    updated_at,
    review,
    rating,
    id,
    eventId,
    avgRating,
    setEvents,
    setReviewComments,
  } = props;
      
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const handleShow = () => {
    setShow(true);
    setMessage(`Are you sure you want to delete this review?`);
    setType("review");
  };
  const handleClose = () => setShow(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = () => {
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  
  const handleReviewDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`)
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === eventId
            ? { ...event, review_count: event.review_count - 1, average_rating: ((event.average_rating - rating) / event.review_count) }
            : event;
        }),
      }));

      setReviewComments((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
    }));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={45} />
          </Link>
          <Media.Body>
            <span className={styles.Username}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            <p className={styles.Comment}>{review}</p>
            <p>
              <Rating readonly initialValue={rating} size={25} />
            </p>
          </Media.Body>
          {is_owner &&  (
          <EditDeleteDropdown
            handleEdit={handleShowEditModal} 
            handleShow={handleShow}
          />
          )}
        </Media>
        <hr />
        <DeleteConfirmationModal
          showModal={show}
          handleClose={handleClose}
          handleReviewDelete={handleReviewDelete}
          type={type}
          message={message}
        />
        <ReviewEditForm 
          showEditModal={showEditModal}
          handleCloseEditModal={handleCloseEditModal}
          eventId={eventId}
          avgRating={avgRating}
          reviewId={id}
          review={review}
          rating={rating}
        />
    </div>
  )
}

export default ReviewComment