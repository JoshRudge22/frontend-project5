import React from 'react';
import FollowingList from '../../components/follow/FollowingList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const MyFollowingList = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Hello</h2>
      <FollowingList username={currentUser.username} />
    </div>
  );
};

export default MyFollowingList;