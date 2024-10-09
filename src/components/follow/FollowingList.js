import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import followStyles from '../../styles/Follow.module.css';
import Spinner from 'react-bootstrap/Spinner'; // Import spinner for loading state

const FollowingList = ({ username }) => {
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get(`/following/${username}/`);
        
        const followingWithImages = await Promise.all(
          response.data.results.map(async (following) => {
            const profileResponse = await axios.get(`/profiles/${following.following_username}/`);
            return {
              ...following,
              profileImage: profileResponse.data.profile_image,
            };
          })
        );

        setFollowingList(followingWithImages);
        setLoading(false);
      } catch (error) {
        setError("Error fetching following list. Please try again later."); // Improved error message
        setLoading(false);
      }
    };

    fetchFollowingList();
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
    return <p className={followStyles.error}>{error}</p>; // Enhanced error handling
  }

  if (followingList.length === 0) {
    return <p>You are not following anyone yet.</p>; // Empty state handling
  }

  return (
    <div>
      <h2 className={followStyles.title}>You Are Following:</h2>
      <ul className={followStyles.list}>
        {followingList.map((following) => (
          <li className={followStyles.follow} key={following.id}>
            <Link 
              className={followStyles.username} 
              to={`/profile/${following.following_username}`} 
              aria-label={`View ${following.following_username}'s profile`} // Added aria-label for accessibility
            >
              <img 
                className={followStyles.image}
                src={following.profileImage} 
                alt={`${following.following_username}'s profile`} 
              />
              {following.following_username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
