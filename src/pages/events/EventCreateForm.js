import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.jpg";

import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";
import { useRedirect } from "../../hooks/UseRedirect";

function EventCreateForm() {

  useRedirect('loggedOut')

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_date: '',
    category: '',
    tags: '',
    image: '',
  });

  const { title, description, event_date, category, tags, image } = eventData;

  const [errors, setErrors] = useState({});
  const imageInput = useRef(null)
  const history = useHistory();

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setEventData({
        ...eventData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('title', title)
    formData.append('description', description)
    formData.append('event_date', event_date)
    formData.append('category', category)
    formData.append('tags', tags)
    formData.append('image', imageInput.current.files[0])

    try {
      const { data } = await axiosReq.post('/events/', formData);
      history.push(`/events/${data.id}`)
    } catch (err) {
      console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  }


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Event Title</Form.Label>
        <Form.Control 
          type="text" 
          name="title"
          value={title} 
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Event Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={4} 
          name="description"
          value={description} 
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Event Date</Form.Label>
        <Form.Control 
          type="date" 
          name="event_date"
          value={event_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.event_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control 
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option>Sport</option>
          <option>Music</option>
          <option>Culture</option>
          <option>Family</option>
          <option>Kids</option>
          <option>Education</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Control 
          type="text" 
          name="tags"
          value={tags}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.tags?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Form}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Form}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure>
                      <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div>
                      <Form.Label 
                        className={`${btnStyles.Button} ${btnStyles.Form} btn`}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click to upload an image" />
                </Form.Label>
                )}
                
                <Form.File 
                  id="image-upload" 
                  accept="image/*"
                  onChange={handleChangeImage} 
                  ref={imageInput}
                />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;