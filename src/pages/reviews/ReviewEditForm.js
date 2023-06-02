// React imports
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Bootstrap imports
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// Component imports
import { axiosReq } from "../../api/axiosDefaults";
// CSS imports
import btnStyles from "../../styles/Button.module.css";
// Additional react component imports
import { Rating } from "react-simple-star-rating";

function ReviewEditForm(props) {

  const { 
        reviewId, 
        showEditModal,
        handleCloseEditModal, 
        rating,
        setReviewComments,
    } = props;

  const [reviewData, setReviewData] = useState({
    review: "",

  })

  const { review } = reviewData;

  const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/${reviewId}/`)
        const {review} = data;
        setReviewData({
          review,
        })
      } catch (err) {
        // console.log(err)
      }
    };
    handleMount();
  }, [history, reviewId])

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('review', review)
    formData.append('rating', rating)

    try {
      await axiosReq.put(`/reviews/${reviewId}/`, formData);
      handleCloseEditModal()
      setReviewComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === reviewId
            ? {
                ...comment,
                review: review,
                updated_at: "now",
              }
            : comment;
        })
        
      }));
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  }

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              To edit your rating, delete the review and start again.
            </Tooltip>
          }
        >
          <p>
            <Rating readonly initialValue={rating} size={25} />
          </p>
        </OverlayTrigger>

        <Form.Label>Edit your Review: </Form.Label>
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