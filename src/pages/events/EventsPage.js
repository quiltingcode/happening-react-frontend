// React imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// Bootstrap imports
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// CSS imports
import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import btnStyles from "../../styles/Button.module.css"
// Component imports
import NoResults from "../../assets/no-results.jpg"
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/Utils";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularEvents from "./PopularEvents";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ScrollToTop from "../../hooks/ScrollToTop";
// Additional react component imports
import InfiniteScroll from "react-infinite-scroll-component";

function EventsPage({ message="", filter="" }) {

  // Scroll to top button appears after scrolling down 700px
  ScrollToTop();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behaviour: 'smooth' });
  }

  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/?${filter}search=${search}&category=${category}`);
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
    
  }, [filter, search, pathname, category, currentUser]);
  
  return (
    <>
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
                // className="mr-sm-2"
                as="select"
                placeholder="Choose..."
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option key="blankChoice" hidden value>
                  {" "}
                  Category{" "}
                </option>
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
                  children={events.results.map((event) => (
                    <Event key={event.id} {...event} setEvents={setEvents} />
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
      
      <div>
        <Button
          className={`${btnStyles.Button} ${btnStyles.ScrollToTop} fixed-bottom-5 left-7 z-50 cursor-pointer`}
          onClick={handleScrollToTop}
          title="Back to Top"
          id="scrollBtn"
        >
          <i className="fa-solid fa-circle-arrow-up" alt="scroll to top"></i>
          <br />
          Back to Top
        </Button>
      </div>
    </>
  );
}

export default EventsPage;