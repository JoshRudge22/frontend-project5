import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { setTokenTimestamp } from '../../utils/utils';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import signStyles from '../../styles/SigningForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import camera from '../../media/camera.jpg';

const signUp = async (signUpData) => {
  const response = await axios.post('/dj-rest-auth/registration/', signUpData);
  return response;
};

const login = async (loginData) => {
  const response = await axios.post('/dj-rest-auth/login/', loginData);
  return response;
};

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: ""
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const setCurrentUser = useSetCurrentUser();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signUpResponse = await signUp(signUpData);
      console.log("Sign Up Response:", signUpResponse);
      const loginData = {
        username: signUpData.username,
        password: signUpData.password1
      };
      const { data } = await login(loginData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push('/welcomePage');
    } catch (err) {
      console.error("Error Response:", err.response);
      setErrors(err.response?.data || { non_field_errors: [err.message] });
    }
  };

  return (
    <Container className={signStyles.container}>
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <h1 className={signStyles.title}>Sign Up Here</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className={signStyles.label}>Username</Form.Label>
              <Form.Control
                className={signStyles.login}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                autoComplete="username"
              />
            </Form.Group>
            {errors.username && errors.username.map((message, idx) => (
              <Alert key={idx} variant="warning">{message}</Alert>
            ))}
            <Form.Group controlId="password1">
              <Form.Label className={signStyles.label}>Password</Form.Label>
              <Form.Control
                className={signStyles.login}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </Form.Group>
            {errors.password1 && errors.password1.map((message, idx) => (
              <Alert key={idx} variant="warning">{message}</Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label className={signStyles.label}>Confirm Password</Form.Label>
              <Form.Control
                className={signStyles.login}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </Form.Group>
            {errors.password2 && errors.password2.map((message, idx) => (
              <Alert key={idx} variant="warning">{message}</Alert>
            ))}
            <Button className={buttonStyles.login} type="submit">Sign Up</Button>
            {errors.non_field_errors && errors.non_field_errors.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">{message}</Alert>
            ))}
          </Form>
          <p className={signStyles.otherlink}>Already have an account? Click on <Link to="/signin">Login</Link></p>
        </Col>
        <Col md={6} className="text-center">
          <img src={camera} alt="Sign Up" className={signStyles.image} />
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;