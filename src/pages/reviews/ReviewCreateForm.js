import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentForm.module.css";
import btnStyles from "../../styles/Button.module.css"
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";


function ReviewCreateForm(props) {
  const { event, setEvent, setReviewComments, profileImage, profile_id } = props;
  const [review, setReview] = useState("");


  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        review,
        rating,
        event,
      });
      setReviewComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setEvent((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            review_count: prevPost.results[0].review_count + 1,
          },
        ],
      }));
      setReview("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} height={35} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="reviews..."
            as="textarea"
            value={review}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      "StarRating"
      <button
        className={`${btnStyles.Button} ${btnStyles.Form} btn d-block ml-auto`}
        disabled={!review.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default ReviewCreateForm;