import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router";
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import buttonStyles from '../../styles/Buttons.module.css';

const Delete = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // To store any error message
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleDelete = async () => {
    setIsDeleting(true); // Show loading state
    setErrorMessage(''); // Clear any previous error
    try {
      await axiosRes.delete(`/profiles/${currentUser.profile_id}`);
      setCurrentUser(null);
      setShowModal(false); // Close the modal after successful deletion
      alert("Profile deleted successfully");
      history.push("/"); // Redirect to home page
    } catch (err) {
      console.error("Error deleting profile:", err);
      setErrorMessage("Failed to delete profile. Please try again."); // Display error message
    } finally {
      setIsDeleting(false); // End loading state
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Profile Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <p>All your posts, comments, likes, followers, and the people you are following will be permanently deleted.</p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Show error message if there's any */}
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