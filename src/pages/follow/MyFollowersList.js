import React from 'react';
import FollowingList from '../../components/follow/FollowingList';

const MyFollowingList = ({ username }) => {
  return (
    <div>
      <h2>Hello</h2>
      <FollowingList username={username} />
    </div>
  );
};

export default MyFollowingList;