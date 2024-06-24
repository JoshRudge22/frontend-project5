import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowersList from '../../components/follow/FollowersList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const MyFollowersList = () => {
  const currentUser = useCurrentUser();
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const fetchFollowerCount = async () => {
        try {
          const response = await axios.get(`/profiles/${currentUser.username}/follow_count/`);
          setFollowerCount(response.data.follower_count);
        } catch (error) {
          console.error('Error fetching follower count:', error);
        }
      };

      fetchFollowerCount();
      const interval = setInterval(fetchFollowerCount, 10000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Number of Follower: {followerCount}</p>
      <FollowersList username={currentUser.username} />
    </div>
  );
};

export default MyFollowersList;