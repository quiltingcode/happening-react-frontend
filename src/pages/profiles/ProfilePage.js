import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.jpg"

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularEvents from "../events/PopularEvents";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { useProfileData } from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Event from "../events/Event";
import { fetchMoreData } from "../../utils/Utils";
import { ProfileEditDropdown } from "../../components/EditDeleteDropdown";
import ChangeUsernameModal from "./ChangeUsernameModal";
import ChangePasswordModal from "./ChangePasswordModal";

function ProfilePage() {

  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  const [profileEvents, setProfileEvents] = useState({results: []});

  const [show, setShow] = useState(false);
  const handleShow = () => {
      setShow(true);
  };
  const handleClose = () => setShow(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const handlePasswordModalShow = () => {
    setShowPasswordModal(true);
  };
  const handleClosePasswordModal = () => setShowPasswordModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{data: pageProfile}, {data: profileEvents}] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/events/?owner__profile=${id}`),
        ]);
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: {results: [pageProfile]}
        }));
        setProfileEvents(profileEvents);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
      fetchData();
  }, [id, setProfileData])

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
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfilePic}
            roundedCircle
            src={profile?.profile_pic}
          />
        </Col>
        <Col lg={9}>
          <h3 className="my-2">{profile?.owner}</h3>
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
            <h5 className="text-center p-2">About Me</h5>

            {profile?.name && (
              <>
                <Col className="p-1">Name:</Col>
                <Col className="p-2">
                  <strong>{profile.name}</strong>
                </Col>
              </>
            )}

            {profile?.bio && (
              <>
                <Col className="p-1">Bio:</Col>
                <Col className="p-2">
                  <strong>{profile.bio}</strong>
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
                <i class="fas fa-phone-alt"></i> {profile.phone_number}
              </Col>
            )}
            {profile?.email && (
              <Col className="p-1">
                <i class="fas fa-at"></i> {profile.email}
              </Col>
            )}
            {profile?.website && (
              <Col className="p-1">
                <i class="fas fa-globe"></i> {profile.website}
              </Col>
            )}
            {profile?.facebook_link && (
              <Col className="p-1">
                <i class="fab fa-facebook"></i> {profile.facebook_link}
              </Col>
            )}
            {profile?.instagram_link && (
              <Col className="p-1">
                <i class="fab fa-instagram"></i> {profile.instagram_link}
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

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
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
        <Container>
            <p className="d-block d-lg-none p-0 p-lg-2">Send a message - mobile</p>
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <Container>
            <p className="d-none d-lg-block p-0 p-lg-2">Send a message - desktop </p>
        </Container>
        <PopularEvents />
        
      </Col>
      <ChangeUsernameModal 
        showModal={show}
        handleClose={handleClose}
      />
      <ChangePasswordModal 
        showPasswordModal={showPasswordModal}
        handleClosePasswordModal={handleClosePasswordModal}
      />

    </Row>
  );
}

export default ProfilePage;