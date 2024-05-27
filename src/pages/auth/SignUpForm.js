import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import axios from 'axios';
import signStyles from '../../styles/SigningForm.module.css';

const signUp = async (signUpData) => {
  const response = await axios.post('/dj-rest-auth/registration/', signUpData);
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
      const response = await signUp(signUpData);
      setCurrentUser(response.data);
      history.push(`/profile/${response.data.user.profile_id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <h1 className={signStyles.title}>Sign Up Here</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label className={signStyles.label}>Username</Form.Label>
          <Form.Control
            className={signStyles.input}
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.username && errors.username.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Form.Group controlId="password1">
          <Form.Label className={signStyles.label}>Password</Form.Label>
          <Form.Control
            className={signStyles.input}
            type="password"
            placeholder="Password"
            name="password1"
            value={password1}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.password1 && errors.password1.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Form.Group controlId="password2">
          <Form.Label className={signStyles.label}>Confirm Password</Form.Label>
          <Form.Control
            className={signStyles.input}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.password2 && errors.password2.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Button type="submit">Sign Up</Button>
        {errors.non_field_errors && errors.non_field_errors.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">{message}</Alert>
        ))}
      </Form>
      <p>Already have an account? Click on <Link to="/signin">Login</Link></p>
    </Container>
  );
}

export default SignUpForm;