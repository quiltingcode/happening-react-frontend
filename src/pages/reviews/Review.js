import React, { useEffect, useState } from 'react'
import styles from '../../styles/Review.module.css'
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from '../../contexts/CurrentUserContext';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import ReviewCreateForm from './ReviewCreateForm';
import ReviewComment from './ReviewComment';


const Review = (props) => {

    const {
        id,
        owner, 
        profile_id,
        profile_image,
        title,
        event_date,
        review_id,
        review_count,
        average_rating,
        eventPage,
        setEvents,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
   

    const [showCreateForm, setShowCreateForm] = useState(false);
    const handleShowCreateForm = () => {
        setShowCreateForm(true);
    };
    const handleCloseCreateForm = () => setShowCreateForm(false);

    const [displayReviewComments, setDisplayReviewComments] = useState(false);
    

    // const [showAlert, setShowAlert] = useState(false)
    // const [confirmReviewMessage, setConfirmReviewMessage] = useState(null);


  const [reviewComments, setReviewComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { results: comments } = await axiosReq.get(`/reviews/?event=${id}`)
        setReviewComments(!reviewComments);
      } catch (err) {
        console.log(err)
      }
    }
    handleMount();
  }, [id])

    const handleReviewDelete = async () => {
        try{
            await axiosRes.delete(`/reviews/${id}/`)
            history.goBack()
            // setShowAlert(true)
            // setConfirmEventMessage(`The event '${title}' was deleted successfully.`);

        } catch(err){
            console.log(err)
        }
    }


  return (
    <>
      <Container className={`${styles.Review} ${appStyles.Content}`}>
        <Row noGutters className="px-3 text-center">
          <Col lg={2} className="text-lg-left">
            <div>
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={55} />
              </Link>
            </div>
          </Col>

          <Col lg={4}>
            <Link to={`/events/${id}`}>
              <span className={`d-inline-column ${styles.Title}`}>
                {title}
                <br />
              </span>
            </Link>

            <span className={`${styles.Date}`}>{event_date}</span>
          </Col>

          <Col lg={4}>
            <div>
              <span className="d-inline-column">{average_rating}</span>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>Click to read the reviews</Tooltip>
                }
              >
                <Button 
                  className={btnStyles.ReviewCountToggle}
                  onClick={() => {
                    setDisplayReviewComments(!displayReviewComments);
                  }}
                >
                  <span className={`d-inline-column ${styles.Title}`}>
                    ({review_count})
                  </span>
                </Button>
              </OverlayTrigger>
              
            </div>
          </Col>
          <Col lg={2}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>You can't review your own event, sorry!</Tooltip>
                }
              >
                <Button className={`${btnStyles.Button} ${btnStyles.Form}`}>
                  Post a Review
                </Button>
              </OverlayTrigger>
            ) : review_id ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You've already reviewed this event'</Tooltip>}
              >
                <Button className={`${btnStyles.Button} ${btnStyles.Form}`}>
                  Post a Review
                </Button>
              </OverlayTrigger>
            ) : (
              <Button
                onClick={handleShowCreateForm}
                className={`${btnStyles.Button} ${btnStyles.Form}`}
              >
                Post a Review
              </Button>
            )}
          </Col>
        </Row>
      </Container>
        {displayReviewComments && <ReviewComment id={id} />}
      <ReviewCreateForm
        id={id}
        showModal={showCreateForm}
        handleCloseCreateForm={handleCloseCreateForm}
        profile_id={currentUser.profile_id}
        profileImage={profile_image}
        event={id}
        setEvents={setEvents}
        // setReviewComments={setReviewComments}
      />
    </>
  );
}

export default Review