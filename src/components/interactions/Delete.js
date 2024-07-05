import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router";
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

const Delete = () => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/profiles/${currentUser.profile_id}`);
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Button variant="danger" onClick={handleShowModal}>Delete Profile</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Profile Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <p>All your posts, comments, likes, followers, and the people you are following will be permanently deleted.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Profile</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;