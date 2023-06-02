// React imports
import {useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// CSS imports
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
// Axios imports
import axios from "axios";
// Component imports
import logo from "../../assets/logo3.png"
import { useRedirect } from "../../hooks/UseRedirect";

const SignUpForm = () => {

  useRedirect('loggedIn');

  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  const {username, password1, password2} = signUpData;
  const [errors, setErrors] = useState({});
  
  const history = useHistory();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post('dj-rest-auth/registration/', signUpData)
        history.push('/signin')
    } catch(err){
        setErrors(err.response?.data)
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
        <Image
          src={logo}
          className="mb-5"
        />
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="text" 
                placeholder="Enter username" 
                name="username"
                value={username}
                onChange={handleChange}
            />
            </Form.Group>
            {errors.username?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="password" 
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="password" 
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Button className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`} type="submit">
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => 
              <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
            )}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>

      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
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
};

export default SignUpForm;