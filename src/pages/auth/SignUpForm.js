import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { setTokenTimestamp } from "../../utils/utils";
import signStyles from '../../styles/SigningForm.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import camera from '../../media/camera.jpg';

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData, { withCredentials: true });

      setCurrentUser(data.user);
      setTokenTimestamp(data);


      history.push(`/profiles/${data.user.id}/`);
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["Invalid username or password."] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setSignInData({ ...signInData, [event.target.name]: event.target.value });
  };

  const isFormValid = () => username && password;

  return (
    <Container className={signStyles.container}>
      <Row className="justify-content-center">
        <Col md={6}>
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
                required
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
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
                required
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">{message}</Alert>
            ))}

            <Button
              className={buttonStyles.login}
              type="submit"
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">{message}</Alert>
            ))}
          </Form>
          <p className={signStyles.otherlink}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </Col>
        <Col md={6} className="text-center">
          <img src={camera} alt="Sign In" className={signStyles.image} />
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;