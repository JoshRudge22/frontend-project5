import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowingList from '../../components/follow/FollowingList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const MyFollowingList = () => {
  const currentUser = useCurrentUser();
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const fetchFollowingCount = async () => {
        try {
          const response = await axios.get(`/profiles/${currentUser.username}/follow_count/`);
          setFollowingCount(response.data.following_count);
        } catch (error) {
          console.error('Error fetching following count:', error);
        }
      };

      fetchFollowingCount();
      const interval = setInterval(fetchFollowingCount, 10000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Following: {followingCount}</p>
      <FollowingList username={currentUser.username} />
    </div>
  );
};

export default MyFollowingList;