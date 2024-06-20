import React from 'react';
import FollowersList from '../../components/follow/FollowersList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const MyFollowersList = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Hello</h2>
      <FollowersList username={currentUser.username} />
    </div>
  );
};

export default MyFollowersList;