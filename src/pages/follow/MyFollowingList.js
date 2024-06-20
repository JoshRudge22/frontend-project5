import React from 'react';
import FollowingList from '../../components/follow/FollowingList';

function MyFollowingList({ username }) {
  return (
    <>
    <h2>Hello</h2>
    <FollowingList username={username} />
    </>
  );
}

export default MyFollowingList;