import React from 'react';
import ProfileInfo from './ProfileInfo';
import UpdateProfile from './UpdateProfile'; 
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const ProfilePage = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileInfo profileId={currentUser.id} />
      <UpdateProfile profileId={currentUser.id} />
    </div>
  );
};

export default ProfilePage;