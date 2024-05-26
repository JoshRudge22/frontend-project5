import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import signStyles from '../../styles/SigningForm.module.css';

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: ""
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { signUp } = useSetCurrentUser();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(signUpData);
      history.push('/');
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
          ></Form.Control>
        </Form.Group>
        {errors.username && errors.username.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Form.Group controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={signStyles.input}
            type="password"
            placeholder="Password"
            name="password1"
            value={password1}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        {errors.password1 && errors.password1.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Form.Group controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className={signStyles.input}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        {errors.password2 && errors.password2.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Button type="submit">Sign Up</Button>
        {errors.non_field_errors && errors.non_field_errors.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">{message}</Alert>
        ))}
      </Form>
      <p>Already have an account? Click on <Link to="/login">Login</Link></p>
    </Container>
  );
}

export default SignUpForm;