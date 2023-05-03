import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";

function EventsPage() {
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <p>Popular profiles</p>
        <div className="d-lg-none">
          <p>Top events this month - mobile</p>
        </div>
        <p>List of events here</p>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Top events this month - desktop</p>
      </Col>
    </Row>
  );
}

export default EventsPage;