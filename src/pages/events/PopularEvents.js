import React, { useEffect, useState } from 'react'
import appStyles from "../../App.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import Container from 'react-bootstrap/Container';
import Asset from '../../components/Asset';

const PopularEvents = () => {

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
    <Container className={appStyles.Content}>
        {topEvents.results.length ? (
            <>
            <h4>Top Events This Month</h4>
                {topEvents.results.map(event => (
                <p key={event.id}>{event.title}</p>
            ))}
            </>
            
        ) : (
            <Asset spinner />
        )}
    </Container>
  )
}

export default PopularEvents