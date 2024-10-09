import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router";
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import buttonStyles from '../../styles/Buttons.module.css';

const Delete = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage('');
    try {
      await axiosRes.delete(`/profiles/${currentUser.profile_id}`);
      setCurrentUser(null);
      setShowModal(false);
      // Display success message (could use a toast here instead of alert)
      alert("Profile deleted successfully");
      history.push("/"); // Redirect to home page
    } catch (err) {
      console.error("Error deleting profile:", err);
      setErrorMessage(err.response?.data?.detail || "Failed to delete profile. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Button
        className={buttonStyles.delete}
        variant="danger"
        onClick={handleShowModal}
      >
        Delete Profile
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} aria-labelledby="delete-modal-title" aria-describedby="delete-modal-description">
        <Modal.Header closeButton>
          <Modal.Title id="delete-modal-title">Confirm Profile Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body id="delete-modal-description">
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <p>All your posts, comments, likes, followers, and the people you are following will be permanently deleted.</p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Profile"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;
