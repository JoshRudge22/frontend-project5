import React, { useState, useEffect } from 'react';
import { followUser, unfollowUser, getFollowers } from '../api/axiosDefaults';

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getFollowers();
        const followersData = response.data.results; // Access the 'results' property
        // Ensure that followersData is an array before further processing
        if (Array.isArray(followersData)) {
          const followRelation = followersData.find(follow => follow.user.id === userId);
          if (followRelation) {
            setIsFollowing(true);
            setFollowId(followRelation.id);
          }
        } else {
          console.error('Invalid data format for followers:', followersData);
        }
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [userId]);

  const handleFollow = async () => {
    try {
      const response = await followUser(userId);
      setIsFollowing(true);
      setFollowId(response.data.id);
    } catch (error) {
      console.error('Error following user:', error.response.data);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(followId);
      setIsFollowing(false);
      setFollowId(null);
    } catch (error) {
      console.error('Error unfollowing user:', error.response.data);
    }
  };

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;