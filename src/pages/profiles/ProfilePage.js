import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

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


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{data: pageProfile}] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`)
        ])
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: {results: [pageProfile]}
        }))
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
      fetchData();
  }, [id, setProfileData])

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfilePic}
            roundedCircle
            src={profile?.profile_pic}
          />
        </Col>
        <Col lg={6}>
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
        <Col lg={3} className="">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Follow}`}
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </Col>
      </Row>
      <Row>
        <Col className="p-3" sm={8} lg={6}>
          <Container className={appStyles.Content}>
            <h5>Bio</h5>
            {profile?.bio}
          </Container>
        </Col>
        <Col className="p-3" sm={8} lg={6}>
          <Container className={appStyles.Content}>
            <h5>Contact Details</h5>
            {profile?.bio}
          </Container>
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owner's posts</p>
      <hr />
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
              {mainProfilePosts}
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
      
    </Row>
  );
}

export default ProfilePage;