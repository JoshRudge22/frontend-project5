import axios from 'axios';
import { useState, useEffect } from 'react';

const FollowButton = ({ profileId, username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await axios.get(`/profiles/${username}/is_following/`);
        setIsFollowing(response.data.is_following);
      } catch (error) {
        console.error(error);
      }
    };

    checkIfFollowing();
  }, [profileId, username]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        // Unfollow
        const response = await axios.delete(`/profiles/${username}/unfollow/`);
        if (response.status === 204) {
          setIsFollowing(false);
        } else {
          console.log(response.data.message);
        }
      } else {
        // Follow
        const response = await axios.post(`/profiles/${username}/follow/`);
        if (response.status === 201) {
          setIsFollowing(true);
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
    </div>
  );
};

export default FollowButton;