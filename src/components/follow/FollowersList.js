import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import followStyles from '../../styles/Follow.module.css';
import Spinner from 'react-bootstrap/Spinner'; // Import spinner for loading state

const FollowersList = ({ username }) => {
  const [followersList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowersList = async () => {
      try {
        const response = await axios.get(`/followers/${username}/`);
        
        const followersWithImages = await Promise.all(
          response.data.results.map(async (follower) => {
            const profileResponse = await axios.get(`/profiles/${follower.follower_username}/`);
            return {
              ...follower,
              profileImage: profileResponse.data.profile_image,
            };
          })
        );

        setFollowersList(followersWithImages);
        setLoading(false);
      } catch (error) {
        setError("Error fetching followers list. Please try again later."); // Improved error message
        setLoading(false);
      }
    };

    fetchFollowersList();
  }, [username]);

  if (loading) {
    return (
      <div className={followStyles.loading}>
        <Spinner animation="border" /> {/* Spinner for loading state */}
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return <p className={followStyles.error}>{error}</p>; // Error handling
  }

  if (followersList.length === 0) {
    return <p>No followers found.</p>; // Empty state handling
  }

  return (
    <div className={followStyles.followersList}>
      <h2 className={followStyles.title}>Your Followers:</h2>
      <ul className={followStyles.list}>
        {followersList.map((follower) => (
          <li className={followStyles.follow} key={follower.id}>
            <Link 
              className={followStyles.username} 
              to={`/profile/${follower.follower_username}`} 
              aria-label={`View ${follower.follower_username}'s profile`} // Added aria-label for accessibility
            >
              <img 
                className={followStyles.image} 
                src={follower.profileImage} 
                alt={`${follower.follower_username}'s profile`} 
              />
              {follower.follower_username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
