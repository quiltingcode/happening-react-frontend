// React imports
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
// Bootstrap imports
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
// CSS imports
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
// Component imports
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.jpg"
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Event from "../events/Event";
import { fetchMoreData } from "../../utils/Utils";
import { ProfileEditDropdown } from "../../components/EditDeleteDropdown";
import ChangeUsernameModal from "./ChangeUsernameModal";
import ChangePasswordModal from "./ChangePasswordModal";
import MessageCreateForm from "../messages/MessageCreateForm";
import Message from "../messages/Message";
import PopularEvents from "../events/PopularEvents";
// Additional react component imports
import InfiniteScroll from "react-infinite-scroll-component";

function ProfilePage() {

  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  const [profileEvents, setProfileEvents] = useState({results: []});
  const [profileMessages, setProfileMessages] = useState({results: []});

  // Variables to display Change Username modal popup
  const [show, setShow] = useState(false);
  const handleShow = () => {
      setShow(true);
  };
  const handleClose = () => setShow(false);

  // Variables to display Change Password modal popup
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const handlePasswordModalShow = () => {
    setShowPasswordModal(true);
  };
  const handleClosePasswordModal = () => setShowPasswordModal(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profileEvents },
          { data: profileMessages },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/events/?owner__profile=${id}`),
          axiosReq.get(`/contact/?profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileEvents(profileEvents);
        setProfileMessages(profileMessages);
        setHasLoaded(true);
        setIsMounted(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();

  }, [id, setProfileData, isMounted]);

  const mainProfile = (
    <>
      {profile?.is_owner && (
        <ProfileEditDropdown
          id={profile?.id}
          handleShow={handleShow}
          handlePasswordModalShow={handlePasswordModalShow}
        />
      )}
      <Row noGutters className="px-3 text-center">
        <Col lg={4} >
          <Image
            className={styles.ProfilePic}
            roundedCircle
            src={profile?.profile_pic}
          />
        </Col>
        <Col lg={8}>
          <h3 className="my-2">{profile?.owner}'s Stats</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={5} className="my-2">
              <div>{profile?.events_count}</div>
              <div>Events Posted</div>
              <div>{profile?.followers_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={5} className="my-2">
              <div>{profile?.going_count}</div>
              <div>Events Attended</div>
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center no-gutters my-3">
        <div className="text-align-center">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.UnfollowMe}`}
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} btn-lg ${btnStyles.FollowMe}`}
                onClick={() => handleFollow(profile)}
              >
                Follow
              </Button>
            ))}
        </div>
      </Row>

      <Row className="justify-content-center no-gutters">
        <Col className="p-3" sm={8} lg={6}>
          <Container className={appStyles.Content}>
            <h5 className="text-center p-2">About {profile?.owner}</h5>

            {profile?.name && (
              <>
                <Col className="p-1">Name:</Col>
                <Col className="p-2">
                  <strong>{profile?.name}</strong>
                </Col>
              </>
            )}

            {profile?.bio && (
              <>
                <Col className="p-1">Bio:</Col>
                <Col className="p-2">
                  <strong>{profile?.bio}</strong>
                </Col>
              </>
            )}
          </Container>
        </Col>
        <Col className="p-3" sm={8} lg={6}>
          <Container className={appStyles.Content}>
            <h5 className="text-center p-2">Contact Details</h5>
            {profile?.phone_number && (
              <Col className="p-1">
                <i className="fas fa-phone-alt"></i> {profile?.phone_number}
              </Col>
            )}
            {profile?.email && (
              <Col className="p-1">
                <i className="fas fa-at"></i> {profile?.email}
              </Col>
            )}
            {profile?.website && (
              <Col className={`${styles.Url} p-1 `}>
                <Link to={{ pathname: profile.website }} target="_blank">
                  <i className="fas fa-globe"></i> {profile?.website}
                </Link>
              </Col>
            )}
            {profile?.facebook_link && (
              <Col className={`${styles.Url} p-1 `}>
                <Link to={{ pathname: profile.facebook_link }} target="_blank">
                  <i className="fab fa-facebook"></i> {profile?.facebook_link}
                </Link>
              </Col>
            )}
            {profile?.instagram_link && (
              <Col className={`${styles.Url} p-1 `}>
                <Link to={{ pathname: profile.instagram_link }} target="_blank">
                  <i className="fab fa-instagram"></i> {profile?.instagram_link}
                </Link>
              </Col>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );

  const mainProfileEvents = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s Events</p>
      <hr />
      {profileEvents.results.length ? (
        <InfiniteScroll
          children={profileEvents.results.map((event) => (
            <Event key={event.id} {...event} setEvents={setProfileEvents} />
          ))}
          dataLength={profileEvents.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileEvents.next}
          next={() => fetchMoreData(profileEvents, setProfileEvents)}
        />
      ) : (
        <Asset 
          src={NoResults} 
          message={`${profile?.owner} hasn't posted any events yet...`}
        />
      )}
    </>
  );

  const mainProfileMessages = (
    <>
      <Container className={`${appStyles.Content} ${styles.Messages}`}>
        <h3 className="text-center">Messages</h3>
        {profileMessages.results.length ? (
          <InfiniteScroll
          children={
            profileMessages.results.map((message) => (
              <Message key={message.id}{...message} />
            ))}
          dataLength={profileMessages.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileMessages.next}
          next={() => fetchMoreData(profileMessages, setProfileMessages)}
          />
        ) : (
          <Asset message={`no messages yet...`} />
        )}
      </Container>
    </>
  );

  return (
    <>
      <Container className={`${appStyles.Content} mt-3`}>
        <h2 className="text-center">{profile?.owner}'s Profile Page</h2>
      </Container>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
          {currentUser && !is_owner && (
            <MessageCreateForm mobile sendToProfile={profile?.owner} />
          )}
          {currentUser &&
            is_owner &&
            (hasLoaded ? (
              <Container className="d-lg-none mb-3">
                {mainProfileMessages}
              </Container>
            ) : (
              <Asset spinner />
            ))}
          <Container className={appStyles.Content}>
            {hasLoaded ? (
              <>
                {mainProfile}
                {mainProfileEvents}
              </>
            ) : (
              <Asset spinner />
            )}
          </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          {currentUser && !is_owner && (
            <MessageCreateForm
              sendToProfile={profile?.owner}
              profileId={profile?.id}
            />
          )}

          {currentUser &&
            is_owner &&
            (hasLoaded ? (
              <Container className="d-none d-lg-block">
                {mainProfileMessages}
              </Container>
            ) : (
              <Asset spinner />
            ))}

          {!currentUser && (isMounted ? <PopularEvents /> : <Asset spinner />)}
        </Col>
        <ChangeUsernameModal showModal={show} handleClose={handleClose} />
        <ChangePasswordModal
          showPasswordModal={showPasswordModal}
          handleClosePasswordModal={handleClosePasswordModal}
        />
      </Row>
    </>
  );
}

export default ProfilePage;