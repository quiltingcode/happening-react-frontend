import React from 'react';
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { Container } from 'react-bootstrap';

const Profile = (props) => {

    const {profile, mobile} = props;
    const {id, following_id, profile_pic, owner} = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

  return (

      <div className={styles.Profiles}>
        <div>
          <Link className="align-self-center" to={`/profiles/${id}`}>
            <Avatar src={profile_pic} height={55} />
          </Link>
        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
            <strong>{owner}</strong>
            </div>
        <div>follow</div>
      </div>

  );
}

export default Profile