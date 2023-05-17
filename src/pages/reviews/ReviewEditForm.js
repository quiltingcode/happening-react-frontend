import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";

import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Rating } from "react-simple-star-rating";
import { Alert, Button, Col, Modal, Row } from "react-bootstrap";

function ReviewEditForm(props) {

  const { 
        reviewId, 
        showEditModal,
        handleCloseEditModal, 
    } = props;

  const [reviewData, setReviewData] = useState({
    review: "",
    rating: 0,
  })

  const { review, rating } = reviewData;

  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [newRating, setNewRating] = useState(0);
  const handleRating = (rate) => {
    setNewRating(rate / 20);
    handleChange(newRating)
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/${reviewId}/`)
        const {review, rating} = data;

        setReviewData({
          review,
          rating
        })
      } catch (err) {
        console.log(err)
      }
    };
    handleMount();
  }, [history, reviewId])

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
      [rating]: newRating
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('rating', rating)
    formData.append('review', review)


    try {
      await axiosReq.put(`/reviews/${reviewId}/`, formData);
      history.push(`/reviews/`)
    } catch (err) {
      console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  }

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Rating 
          initialValue={rating}
          onClick={handleRating} 
        />
      </Form.Group>
      {errors?.rating?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="review"
          value={review}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.review?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Form}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Form}`} type="submit">
        Save
      </Button>
    </div>
  );


  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="py-2 mx-auto text-center" md={6}>
            <Form onSubmit={handleSubmit}>
              {textFields}
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ReviewEditForm;