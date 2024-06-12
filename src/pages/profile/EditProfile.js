import React from 'react';
import UpdateProfile from './UpdateProfile'; 
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const EditProfile = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UpdateProfile profileId={currentUser.id} />
    </div>
  );
};

export default EditProfile;