import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";

function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: event }] = await Promise.all([
              axiosReq.get(`/events/${id}`),
            ]);
            setEvent({ results: [event] });
            console.log(event)
          } catch (err) {
            // console.log(err);
          }
        };
    
        handleMount();
      }, [id]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles</p>
        <div className="d-lg-none">
          <p>Top events this month - mobile</p>
        </div>
        
        <Event {...event.results[0]} setEvents={setEvent} eventPage />
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      Top events this month - desktop
      </Col>
    </Row>
  );
}

export default EventPage;