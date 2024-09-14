import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import buttonStyles from '../../styles/Buttons.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const FollowButton = ({ profileId, username }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await axios.get(`/profiles/${username}/is_following/`);
        setIsFollowing(response.data.is_following);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    if (currentUser?.username !== username) {
      checkIfFollowing();
    }
  }, [profileId, username, currentUser]);

  const handleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        const response = await axios.delete(`/profiles/${username}/unfollow/`);
        if (response.status === 204) {
          setIsFollowing(false);
        }
      } else {
        const response = await axios.post(`/profiles/${username}/follow/`);
        if (response.status === 201) {
          setIsFollowing(true);
        }
      }
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  if (currentUser?.username === username) {
    return null;
  }

  return (
    <div>
      <Button
        className={buttonStyles.follow}
        onClick={handleFollow}
        disabled={loading}
      >
        {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default FollowButton;