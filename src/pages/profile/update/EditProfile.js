import React from 'react';
import UpdateProfile from './UpdateProfile'; 
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import profileStyles from '../../../styles/profiles/Profile.module.css';

const EditProfile = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UpdateProfile className={profileStyles} profileId={currentUser.id} />
    </div>
  );
};

export default EditProfile;