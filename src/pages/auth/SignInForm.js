import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import logo from "../../assets/logo3.png"
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/UseRedirect";
import { setTokenTimestamp } from "../../utils/Utils";


function SignInForm() {

    const setCurrentUser = useSetCurrentUser();
    useRedirect('loggedIn')

    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
      });

    const {username, password} = signInData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        setSignInData({
          ...signInData,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('dj-rest-auth/login/', signInData)
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            history.goBack();
        } catch(err){
            setErrors(err.response?.data)
        }
    };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <Image src={logo} className="mb-5" />
          <h1 className={styles.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="text" 
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleChange}
                  />
            </Form.Group>
            {errors.username?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="password" 
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange} 
              />
            </Form.Group>
            {errors.password?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Button className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`} type="submit">
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => 
              <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>
            )}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dkolsfjkx/image/upload/v1682587597/poster-small_wobgy2.jpg"
          }
        />
      </Col>
    </Row>
  );
}

export default SignInForm;