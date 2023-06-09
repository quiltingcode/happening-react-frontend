// React imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// CSS imports
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularEvents.module.css"
// Component imports
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import DateFormatter from '../../utils/DateFormatter';
// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const PopularEvents = ({ mobile }) => {
  const [topEventsData, setTopEventsData] = useState({
    topEvents: { results: [] },
  });

  const { topEvents } = topEventsData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/events/?ordering=-going_count");
        setTopEventsData((prevState) => ({
          ...prevState,
          topEvents: data,
        }));
      } catch (err) {
        // console.log(err)
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {topEvents.results.length ? (
        <>
          <h4 className="text-center mb-4">Top Upcoming Events</h4>
          {mobile ? (
            <div className="d-flex">
              {topEvents.results
                .filter((a) => new Date(a.event_date) - new Date() > 0)
                .slice(0, 5)
                .map((event) => (
                  <Card key={event.id} className={`${styles.Card} mr-2 p-2`}>
                    <Link to={`/events/${event.id}`} className={styles.Link}>
                      {event.title}
                    </Link>
                  </Card>
                ))}
            </div>
          ) : (
            topEvents.results
              .filter((a) => new Date(a.event_date) - new Date() > 0)
              .map((event) => (
                <div key={event.id}>
                  <Link to={`/events/${event.id}`}>
                    <strong>{event.title}</strong>
                  </Link>
                  <p>
                    <DateFormatter event_date={event.event_date} />
                  </p>
                  <hr />
                </div>
              ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default PopularEvents