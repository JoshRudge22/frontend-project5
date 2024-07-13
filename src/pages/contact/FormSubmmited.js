import React from 'react';
import submittedStyles from '../../styles/contact/Submitted.module.css'

const FormSubmitted = () => {
  return (
    <div className={submittedStyles.container}>
      <h2 className={submittedStyles.title}>Form Submitted Successfully!</h2>
      <p className={submittedStyles.message}>
        Thank you for submitting the form, we always aim to be in touch within 2 working days from when the form was submitted.
      </p>
      <p className={submittedStyles.message}>
        If you haven't heard back in 2 working days you can either email, call or write to us with the information below.
      </p>
      <ul className={submittedStyles.contactList}>
        <li>Email: <a className={submittedStyles.link} href="mailto:joshrudge@hotmail.com">joshrudge@hotmail.com</a></li>
        <li>Phone Number: 01925 000000</li>
        <li>Address: 133 Something, New City, WA2 44ET</li>
      </ul>
      <p className={submittedStyles.message}>Please check junk mail</p>
    </div>
  );
};

export default FormSubmitted;