import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import contactstyles from '../../styles/Contact.module.css'
import buttonstyles from '../../styles/Buttons.module.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', number: '', message: '' });
      } else {
        alert('Error: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label className={contactstyles.label}>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </Form.Label>
      <br />
      <Form.Label className={contactstyles.label}>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Label>
      <br />
      <Form.Label className={contactstyles.label}>
        Phone Number:
        <input type="text" name="number" value={formData.number} onChange={handleChange} />
      </Form.Label>
      <br />
      <Form.Label className={contactstyles.label}>
        Message:
        <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
      </Form.Label>
      <br />
      <Button className={buttonstyles.save} type="submit">Submit</Button>
    </Form>
  );
};

export default ContactForm;