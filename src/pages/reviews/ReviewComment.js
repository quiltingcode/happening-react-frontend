import React from 'react'
import Container from 'react-bootstrap/Container';
import appStyles from "../../App.module.css";

const ReviewComment = (props) => {


 const { id } = props;
    

  return (
    <div>
        <Container className={` my-2 ${appStyles.Content}`}>
            Reviews
        </Container>
    </div>
  )
}

export default ReviewComment