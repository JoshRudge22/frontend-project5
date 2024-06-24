import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useRedirect } from '../../hooks/useRedirect';
import axios from 'axios';
import signStyles from '../../styles/SigningForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css'

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

  useRedirect('loggedOut');
  
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
      console.log("Response Data:", signUpResponse.data);
  
      if (signUpResponse.status === 201) {
        const loginData = {
          username: signUpData.username,
          password: signUpData.password1
        };
        const loginResponse = await login(loginData);
        console.log("Login Response:", loginResponse);

        if (loginResponse.status === 200) {
          history.push(`/WelcomePage/`);
        } else {
          throw new Error("Failed to log in after registration");
        }
      } else {
        throw new Error("Failed to sign up");
      }
    } catch (err) {
      console.log("Error Response:", err.response);
      setErrors(err.response?.data || { non_field_errors: [err.message] });
    }
  };

  return (
    <Container className={signStyles.container}>
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
    </Container>
  );
}

export default SignUpForm;