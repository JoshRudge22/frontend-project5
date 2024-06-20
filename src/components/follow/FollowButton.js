import axios from 'axios';
import { useState, useEffect } from 'react';

const FollowButton = ({ profileId, username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await axios.get(`/following/${username}/`);
        console.log("API response for following list:", response.data);
        const { results } = response.data;
        const followingIds = results.map(follower => follower.following);
        setIsFollowing(followingIds.includes(profileId));
      } catch (error) {
        console.error(error);
      }
    };

    checkIfFollowing();
  }, [profileId, username]);

  const handleFollow = async () => {
    try {
      const response = await axios.post(`/profiles/${username}/follow/`, {
        following: profileId,
      });

      if (response.status === 201) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.delete(`/profiles/${profileId}/unfollow/`);

      if (response.status === 204) {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
};

export default FollowButton;