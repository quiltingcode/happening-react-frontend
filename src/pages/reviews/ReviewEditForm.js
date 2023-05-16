import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/CommentForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Rating } from "react-simple-star-rating";
import { Alert, Button, Col, Modal, ModalFooter, Row } from "react-bootstrap";

function ReviewEditForm(props) {

  const { 
        reviewId, 
        review,
        rating,
        showEditModal,
        handleCloseEditModal, 
        setReviewComments,
        setEvents,
        eventId,
        avgRating,
    } = props;

    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);

  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleRating = (rate) => {
    setNewRating(rate / 20);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('rating', rating)
    formData.append('review', review)

    try {
        await axiosReq.put(`/reviews/${reviewId}/`, formData);
      setReviewComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === reviewId
            ? {
                ...comment,
                rating: newRating,
                review: newReview,
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === eventId
            ? { ...event, avgRating }
            : event;
        }),
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="py-2 mx-auto text-center" md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="pr-1">
                <Rating onClick={handleRating} initialValue={rating} />
              </Form.Group>
              {errors?.rating?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <Form.Group className="pr-1">
                <Form.Control
                  className={styles.Form}
                  as="textarea"
                  value={review}
                  onChange={handleChange}
                  rows={2}
                />
              </Form.Group>
              {errors?.review?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <ModalFooter>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Form}`}
                  onClick={handleCloseEditModal}
                >
                  Cancel
                </Button>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Form}`}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ReviewEditForm;