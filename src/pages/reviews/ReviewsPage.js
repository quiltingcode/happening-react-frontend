import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NoResults from "../../assets/no-results.jpg"

import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/Utils";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularEvents from "../events/PopularEvents";
import Review from "./Review";


function ReviewsPage({ message, filter="" }) {

  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${filter}&search=${search}&category=${category}`);
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
    
  }, [filter, search, pathname, category]);
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles />

        <PopularEvents mobile />

        <Container>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              size="sm"
              type="text"
              className="mr-sm-2"
              placeholder="Search events by title, profile, event date or tags"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <Form.Control 
              size="sm" 
              as="select" 
              placeholder="Choose..."
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option key = 'blankChoice' hidden value> Category </option>
              <option>Sport</option>
              <option>Music</option>
              <option>Culture</option>
              <option>Family</option>
              <option>Kids</option>
              <option>Education</option>
            </Form.Control>
          </Form>
        </Container>

        {hasLoaded ? (
          <>
            {events.results.length ? (
              <InfiniteScroll
                children={events.results.filter(a => new Date(a.event_date) - new Date() < 0).map((review) => (
                  <Review key={review.id} {...review} setEvents={setEvents} />
                ))}
                dataLength={events.results.length}
                loader={<Asset spinner />}
                hasMore={!!events.next}
                next={() => fetchMoreData(events, setEvents)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularEvents />
      </Col>
    </Row>
  );
}

export default ReviewsPage;