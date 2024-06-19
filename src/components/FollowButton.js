import axios from 'axios';
import { useState, useEffect } from 'react';

export const FollowButton = ({ profileId,  username }) => {
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
  }, [profileId, username]);

  const handleFollow = async () => {
    try {
      console.log(profileId)
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
    <>
      {isFollowing? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </>
  );
};
export default FollowButton;