import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner
import buttonStyles from '../../styles/Buttons.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const FollowButton = ({ profileId, username }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling
  const currentUser = useCurrentUser();

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await axios.get(`/profiles/${username}/is_following/`);
        setIsFollowing(response.data.is_following);
      } catch (error) {
        console.error("Error checking follow status:", error);
        setError("Could not determine follow status."); // Set error message
      }
    };

    if (currentUser?.username !== username) {
      checkIfFollowing();
    }
  }, [username, currentUser]);

  const handleFollow = async () => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true);
    setError(null); // Reset error state
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
      setError("Something went wrong. Please try again."); // Update error state
    } finally {
      setLoading(false);
    }
  };

  if (currentUser?.username === username) {
    return null;
  }

  return (
    <div>
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      <Button
        className={buttonStyles.follow}
        onClick={handleFollow}
        disabled={loading}
        aria-label={isFollowing ? "Unfollow" : "Follow"} // Accessibility
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> {/* Spinner for loading */}
            Processing...
          </>
        ) : (
          isFollowing ? "Unfollow" : "Follow"
        )}
      </Button>
    </div>
  );
};

export default FollowButton;
