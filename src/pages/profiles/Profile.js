import React from 'react';
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import Button from 'react-bootstrap/Button';
import { useSetProfileData } from '../../contexts/ProfileDataContext';


const Profile = (props) => {

    const {profile} = props;
    const {id, following_id, profile_pic, owner} = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const {handleFollow, handleUnfollow} = useSetProfileData();

  return (
    <div className={styles.Profiles}>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={profile_pic} height={40} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>{owner}</div>
      <div className="mx-2">
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Follow}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
}

export default Profile