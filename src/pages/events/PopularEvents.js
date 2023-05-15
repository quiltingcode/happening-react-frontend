import React, { useEffect, useState } from 'react'
import appStyles from "../../App.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import Container from 'react-bootstrap/Container';
import Asset from '../../components/Asset';
import { Card } from 'react-bootstrap';
import styles from "../../styles/PopularEvents.module.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DateFormatter from '../../utils/DateFormatter';

const PopularEvents = ({ mobile }) => {

    const [topEventsData, setTopEventsData] = useState({
        topEvents: { results: [] },
    })

    const { topEvents } = topEventsData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/events/?ordering=-going_count"
                    );
                    setTopEventsData((prevState) => ({
                        ...prevState,
                        topEvents: data,
                    }));
            } catch (err) {
                console.log(err)
            }
        };
        handleMount();
    }, [currentUser]);


  return (
    <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
        {topEvents.results.length ? (
            <>
            <h4 className='text-center mb-4'>Top Events This Month</h4>
            {mobile ? (
                <div className='d-flex'>
                    {topEvents.results.slice(0,5).map((event) => (
                    <Card 
                        key={event.id} 
                        className={`${styles.Card} mr-2`}
                    >
                        <Link to={`/events/${event.id}`} className={styles.Link}>
                            {event.title}
                        </Link>
                    </Card> 
                    ))}
                </div>
            ) : (
                topEvents.results.map((event) => (
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
  )
}

export default PopularEvents