import axios from 'axios';
import { useState, useEffect } from 'react';

export const FollowButton = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await axios.get(`/followers/${username}/`);
        setIsFollowing(response.data.is_following);
      } catch (error) {
        console.error(error);
      }
    };

    checkIfFollowing();
  }, [username]);

  const handleFollow = async () => {
    try {
      const response = await axios.post('/followers/', {
        following: username,
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
      const response = await axios.delete(`/unfollow/${username}/`);

      if (response.status === 204) {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </>
  );
};
export default FollowButton;