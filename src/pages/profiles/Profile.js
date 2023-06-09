// React imports
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// CSS imports
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
// Component imports
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSetProfileData } from '../../contexts/ProfileDataContext';
import Avatar from '../../components/Avatar';
// Bootstrap imports
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Profile = (props) => {

    const {profile} = props;
    const {id, following_id, profile_pic, owner} = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const {handleFollow, handleUnfollow} = useSetProfileData();

  return (
    <div className={`${styles.Profiles} mb-2`}>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={profile_pic} height={40} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>{owner}</div>
      {currentUser &&
      <div className={`${styles.ProfileFollow}`} >
        {  is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>You can't follow yourself!</Tooltip>
              }
            >
              <Button
              className={`${btnStyles.Button} ${btnStyles.CantFollow}`}
            >
              follow
            </Button>
            </OverlayTrigger>
          ) : following_id ? (
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
          )}
      </div>
      }     
    </div>
  );
}

export default Profile