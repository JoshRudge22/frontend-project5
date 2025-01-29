import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Delete from '../../../components/interactions/Delete';
import deleteStyles from '../../../styles/Delete.module.css';
import ConfirmationModal from '../../../components/ConfirmationModal';

const DeleteProfile = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className={deleteStyles.container}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className={deleteStyles.card}>
            <Card.Header>
              <h2 className={deleteStyles.title}>Profile Settings</h2>
            </Card.Header>
            <Card.Body>
              <h3>Deleting Your Profile</h3>
              <p>
                Deleting your profile is a permanent action and cannot be undone. If you proceed with deleting your profile, the following will occur:
              </p>
              <ul>
                <li className={deleteStyles.deletelist}>All of your posts will be permanently deleted.</li>
                <li className={deleteStyles.deletelist}>All of your comments on other posts will be permanently deleted.</li>
                <li className={deleteStyles.deletelist}>All of your likes on other posts will be permanently deleted.</li>
                <li className={deleteStyles.deletelist}>All of your followers will be lost.</li>
                <li className={deleteStyles.deletelist}>All of the users you are following will be unfollowed.</li>
              </ul>
              <p>
                If you are sure you want to delete your profile, click the button below. Please note that this action is irreversible.
              </p>
              <button onClick={handleDeleteClick} className={deleteStyles.deleteButton}>
                Delete Profile
              </button>
              <Delete /> {/* Assuming Delete component handles the actual deletion */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ConfirmationModal 
        show={showModal} 
        onClose={handleCloseModal} 
        onConfirm={Delete} // Call the delete function here
        title="Confirm Deletion"
        message="Are you sure you want to delete your profile? This action cannot be undone."
      />
    </Container>
  );
};

export default DeleteProfile;
