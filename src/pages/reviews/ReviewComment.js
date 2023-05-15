import React from 'react'

import styles from "../../styles/Comment.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { Media } from 'react-bootstrap';
import { Rating } from "react-simple-star-rating";

const ReviewComment = (props) => {

 const { 
  profile_id,
  profile_image,
  owner, 
  updated_at,
  review,
  rating,
 } = props;
    

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
        </Media>
        <hr />
    </div>
  )
}

export default ReviewComment