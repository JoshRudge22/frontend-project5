import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useHistory } from 'react-router-dom';
import { setTokenTimestamp } from '../../utils/utils';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import signStyles from '../../styles/SigningForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import signup from '../../media/signup.jpg';

const signUp = async (signUpData) => {
  return await axios.post('/dj-rest-auth/registration/', signUpData, { withCredentials: true });
};

const login = async (loginData) => {
  return await axios.post('/dj-rest-auth/login/', loginData, { withCredentials: true });
};

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: ''
  });

  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const setCurrentUser = useSetCurrentUser();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (password1 !== password2) {
      newErrors.password2 = ['Passwords do not match.'];
    }
    if (password1.length < 6) {
      newErrors.password1 = ['Password must be at least 6 characters long.'];
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await signUp(signUpData);
      const { data } = await login({ username, password: password1 });

      setCurrentUser(data.user);
      setTokenTimestamp(data);

      history.push(`/profiles/username/${data.user.username}/`);

    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ['An error occurred. Please try again.'] });
    } finally {
      setIsLoading(false);
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
                required
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
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
                required
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
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
                required
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">{message}</Alert>
            ))}

            <Button className={buttonStyles.login} type="submit" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">{message}</Alert>
            ))}
          </Form>
          <p className={signStyles.otherlink}>Already have an account? Click on <Link to="/signin">Login</Link></p>
        </Col>
        <Col md={6} className="text-center">
          <img src={signup} alt="Sign Up" className={signStyles.image} />
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;