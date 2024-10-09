import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowersList from '../../components/follow/FollowersList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import followStyles from '../../styles/Follow.module.css';

const MyFollowersList = () => {
  const currentUser = useCurrentUser();
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchFollowerCount = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/profiles/${currentUser.username}/following_count/`);
          setFollowerCount(response.data.follower_count);
          setError(null); // Reset error on successful fetch
        } catch (error) {
          console.error('Error fetching follower count:', error);
          setError('Failed to fetch follower count. Please try again later.');
        } finally {
          setLoading(false);
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
      <h2 className={followStyles.Number}>
        Number of Followers: {loading ? 'Loading...' : followerCount}
      </h2>
      {error && <p className={followStyles.Error}>{error}</p>}
      <FollowersList username={currentUser.username} />
    </div>
  );
};

export default MyFollowersList;
