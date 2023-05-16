import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/CommentForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Rating } from "react-simple-star-rating";
import { Alert, Button, Col, Modal, ModalFooter, Row } from "react-bootstrap";

function ReviewEditForm(props) {

  const { 
        id, 
        showEditModal,
        handleCloseEditModal, 
        setReviewComments,
        setEvents,
        eventId,
        avgRating,
    } = props;

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

  const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
        try {
            const { data } = await axiosReq.get(`/reviews/${id}/`);
            const {rating, review, is_owner} = data;


            setReview(review)
            setRating(rating)

        } catch (err) {
            console.log(err);
        }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleRating = (rate) => {
    setRating(rate / 20);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('rating', rating)
    formData.append('review', review)

    try {
        await axiosReq.put(`/reviews/${id}/`, formData);
      setReviewComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                rating,
                review,
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
                <Rating onClick={handleRating} value={rating} />
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