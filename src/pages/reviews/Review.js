import React, { useState } from 'react'
import styles from '../../styles/Review.module.css'
import appStyles from "../../App.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ReviewCreateForm from './ReviewCreateForm';


const Review = (props) => {

    const {
        id,
        owner, 
        profile_id,
        profile_image,
        title,
        event_date,
        review_count,
        average_rating,
        eventPage,
        setEvents,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const [reviewComments, setReviewComments] = useState({results: []});

    const [showCreateForm, setShowCreateForm] = useState(false);
    const handleShowCreateForm = () => {
        setShowCreateForm(true);
    };
    const handleCloseCreateForm = () => setShowCreateForm(false);

    // const [showAlert, setShowAlert] = useState(false)
    // const [confirmReviewMessage, setConfirmReviewMessage] = useState(null);


    const handleEdit = async () => {
        history.push(`/events/${id}/edit`)
    }

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
                  {title}{" "}
                </span>
              </Link>

              <span className={`${styles.Date}`}>{event_date}</span>
            </Col>

            <Col lg={4}>
              <div>
                <span className="d-inline-column">{average_rating}</span>
                <span className={`d-inline-column ${styles.Title}`}>
                  ({review_count})
                </span>
              </div>
            </Col>
            <Col lg={2}>
              <Button onClick={handleShowCreateForm}>
                Post a Review
              </Button>
              
            </Col>
          </Row>
      </Container>

      <Container className={` my-2 ${appStyles.Content}`}>
          {currentUser ? (
            <ReviewCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              event={id}
              setEvents={setEvents}
              setReviewComments={setReviewComments}
            />
          ) : reviewComments.results.length ? (
            "ReviewComments"
          ) : null}
        </Container>
            <ReviewCreateForm 
              id={id} 
              showModal={showCreateForm} 
              handleCloseCreateForm={handleCloseCreateForm} 
            />
    </>
  );
}

export default Review