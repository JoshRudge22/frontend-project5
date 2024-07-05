import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import contactstyles from '../../styles/Contact.module.css';
import buttonstyles from '../../styles/Buttons.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });


  const history = useHistory();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/contact/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', number: '', message: '' });
        history.push('/submitted');
      } else {
        const errorMessage = response.data;
        alert('Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <Container className={contactstyles.contactContainer}>
      <h1>Contact Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label className={contactstyles.contactLabel}>Name:</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className={contactstyles.contactLabel}>Email:</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formNumber">
          <Form.Label className={contactstyles.contactLabel}>Phone Number:</Form.Label>
          <Form.Control type="text" name="number" value={formData.number} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label className={contactstyles.contactLabel}>Message:</Form.Label>
          <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} required />
        </Form.Group>
        <Button className={buttonstyles.save} type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default ContactForm;