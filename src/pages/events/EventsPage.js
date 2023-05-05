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
import Event from "./Event";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/Utils";

function EventsPage({ message, filter="" }) {

  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/?${filter}search=${search}`);
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
    
  }, [filter, search, pathname]);
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <p>Popular profiles</p>
      <i className={`fas fa-search ${styles.SearchIcon}`} />
      <Form 
        className={styles.SearchBar}
        onSubmit={(event) => event.preventDefault()}
      >
        <Form.Control
          type="text"
          className="mr-sm-2"
          placeholder="Search events by title, profile, event date or tags" 
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Form>

        <div className="d-lg-none">
          <p>Top events this month - mobile</p>
        </div>
        {hasLoaded ? (
          <>
          {events.results.length ? (
            <InfiniteScroll 
              children={
                events.results.map(event => (
                  <Event key={event.id} {...event} setEvents={setEvents} />
                ))
              }
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
        )
      
      }
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Top events this month - desktop</p>
      </Col>
    </Row>
  );
}

export default EventsPage;