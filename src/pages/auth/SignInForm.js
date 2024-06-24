import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useRedirect } from '../../hooks/useRedirect';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import signStyles from '../../styles/SigningForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css'

function SignInForm() {
  const [signInData, setSignInData] = useState({
    username: "",
    password: ""
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { login } = useSetCurrentUser();

  useRedirect('loggedOut');

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const userData = await login(signInData);
        console.log("Server Response:", userData);
        const profileId = userData.data.user.profile_id;
        history.push(`/profiles/${profileId}`);
    } catch (err) {
        setErrors(err.response?.data || {});
    }
};

  return (
    <Container className={signStyles.container}>
      <h1 className={signStyles.title}>Sign In Here</h1>
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
          />
        </Form.Group>
        {errors.username && errors.username.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Form.Group controlId="password">
          <Form.Label className={signStyles.label}>Password</Form.Label>
          <Form.Control
            className={signStyles.login}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.password && errors.password.map((message, idx) => (
          <Alert key={idx} variant="warning">{message}</Alert>
        ))}
        <Button className={buttonStyles.login} type="submit">Sign In</Button>
        {errors.non_field_errors && errors.non_field_errors.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">{message}</Alert>
        ))}
      </Form>
      <p className={signStyles.otherlink}>Don't have an account? Click on <Link to="/signup">Sign Up</Link></p>
    </Container>
  );
}

export default SignInForm;