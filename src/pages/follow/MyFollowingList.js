import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowingList from '../../components/follow/FollowingList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import followStyles from '../../styles/Follow.module.css';

const MyFollowingList = () => {
  const currentUser = useCurrentUser();
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchFollowingCount = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/profiles/${currentUser.username}/following_count/`);
          setFollowingCount(response.data.following_count);
          setError(null); // Clear error on success
        } catch (error) {
          console.error('Error fetching following count:', error);
          setError('Failed to load following count');
        } finally {
          setLoading(false);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className={followStyles.Number}>Following: {followingCount}</h2>
      <FollowingList username={currentUser.username} />
    </div>
  );
};

export default MyFollowingList;
