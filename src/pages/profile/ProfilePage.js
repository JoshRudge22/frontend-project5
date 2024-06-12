import React from 'react';
import ProfileInfo from './ProfileInfo';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const ProfilePage = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileInfo profileId={currentUser.id} />
    </div>
  );
};

export default ProfilePage;