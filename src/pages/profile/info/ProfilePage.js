import React from 'react';
import ProfileInfo from './ProfileInfo';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import profileStyles from '../../../styles/Profile.module.css';

const ProfilePage = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileInfo profileId={currentUser.id} className={profileStyles}/>
    </div>
  );
};

export default ProfilePage;