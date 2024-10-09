import React from 'react';
import UpdateProfile from './UpdateProfile'; 
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import profileStyles from '../../../styles/profiles/Profile.module.css';

const EditProfile = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <div className={profileStyles.loading}>Loading...</div>; // Optional: Apply styles
  }

  if (!currentUser.id) {
    return <div className={profileStyles.error}>Error: User not found.</div>; // Handle missing user ID
  }

  return (
    <>
      <UpdateProfile profileId={currentUser.id} />
    </>
  );
};

export default EditProfile;
