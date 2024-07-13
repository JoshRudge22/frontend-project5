import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Delete from '../../../components/interactions/Delete';
import deleteStyles from '../../../styles/Delete.module.css'

const DeleteProfile = () => {
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
                <li>All of your posts will be permanently deleted.</li>
                <li>All of your comments on other posts will be permanently deleted.</li>
                <li>All of your likes on other posts will be permanently deleted.</li>
                <li>All of your followers will be lost.</li>
                <li>All of the users you are following will be unfollowed.</li>
              </ul>
              <p>
                If you are sure you want to delete your profile, click the button below. Please note that this action is irreversible.
              </p>
              <Delete />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteProfile;