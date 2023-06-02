// React imports
import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
// Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// Component imports
import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
// CSS imports
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    profile_pic: "",
    website: "",
    instagram_link: "",
    facebook_link: "",
    phone_number: "",
    email: "",
  });
  const { 
    name, 
    owner,
    bio, 
    profile_pic, 
    website, 
    instagram_link, 
    facebook_link, 
    phone_number, 
    email 
    } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { 
            name,
            owner, 
            bio, 
            profile_pic, 
            website, 
            instagram_link, 
            facebook_link, 
            phone_number, 
            email } = data;
          setProfileData(
            { 
                name, 
                owner,
                bio, 
                profile_pic, 
                website, 
                instagram_link, 
                facebook_link, 
                phone_number, 
                email 
            });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("website", website);
    formData.append("instagram_link", instagram_link);
    formData.append("facebook_link", facebook_link);
    formData.append("phone_number", phone_number);
    formData.append("email", email);

    if (imageFile?.current?.files[0]) {
      formData.append("profile_pic", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_pic: data.profile_pic,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Name or Company Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Bio:</Form.Label>
        <Form.Control
          as="textarea"
          value={bio}
          onChange={handleChange}
          name="bio"
          rows={4}
        />
      </Form.Group>
      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Website URL:</Form.Label>
        <Form.Control
          type="text"
          value={website}
          onChange={handleChange}
          name="website"
        />
      </Form.Group>
      {errors?.website?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Instagram URL:</Form.Label>
          <Form.Control 
            type="text" 
            value={instagram_link}
            onChange={handleChange}
            name="instagram_link"
          />
        </Form.Group>
        {errors?.instagram_link?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

        <Form.Group as={Col}>
          <Form.Label>Facebook URL:</Form.Label>
          <Form.Control 
            type="text"  
            value={facebook_link}
            onChange={handleChange}
            name="facebook_link"
          />
        </Form.Group>
        {errors?.facebook_link?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control 
            type="text" 
            value={phone_number}
            onChange={handleChange}
            name="phone_number"
          />
        </Form.Group>
        {errors?.phone_number?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

        <Form.Group as={Col}>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control 
            type="email"  
            value={email}
            onChange={handleChange}
            name="email"
          />
        </Form.Group>
        {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      </Form.Row>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Form}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Form}`} type="submit">
        Save
      </Button>
    </>
  );

  return (
    <>
      <Container className={`${appStyles.Content} mt-3`}>
        <h2 className="text-center">Edit {owner}'s Profile</h2>
      </Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={4}>
            <Container className={appStyles.Content}>
              <Form.Group>
                {profile_pic && (
                  <figure>
                    <Image src={profile_pic} fluid />
                  </figure>
                )}
                {errors?.profile_pic?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Form} btn my-auto`}
                    htmlFor="image-upload"
                  >
                    Change profile Image
                  </Form.Label>
                </div>
                <Form.File
                  id="image-upload"
                  ref={imageFile}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setProfileData({
                        ...profileData,
                        profile_pic: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
              </Form.Group>
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col
            md={5}
            lg={8}
            className="d-none d-md-block p-0 p-md-2 text-center"
          >
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProfileEditForm;