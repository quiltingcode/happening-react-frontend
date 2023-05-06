import React from 'react';
import styles from "../../styles/Comment.module.css";
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';

const Comment = (props) => {

    const {profile_id, profile_image, owner, updated_at, content} = props;

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
        </Media>
    </div>
  )
}

export default Comment