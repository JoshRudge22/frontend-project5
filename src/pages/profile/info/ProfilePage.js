import React, { useState, useEffect } from 'react';
import ProfileInfo from './ProfileInfo';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import profileStyles from '../../../styles/profiles/Profile.module.css';
import Spinner from 'react-bootstrap/Spinner'; // Assuming you're using react-bootstrap

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      // Add logic to check if the user failed to load
      setError('Failed to load user profile. Please try again later.');
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className={profileStyles.loadingContainer}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className={profileStyles.errorMessage}>{error}</div>;
  }

  return (
    <>
      <ProfileInfo profileId={currentUser.id} className={profileStyles} />
    </>
  );
};

export default ProfilePage;
