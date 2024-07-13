import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import buttonStyles from '../../styles/Buttons.module.css';

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
        const response = await axios.delete(`/profiles/${username}/unfollow/`);
        if (response.status === 204) {
          setIsFollowing(false);
        } else {
          console.log(response.data.message);
        }
      } else {
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
      <Button className={buttonStyles.follow} onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</Button>
    </div>
  );
};

export default FollowButton;