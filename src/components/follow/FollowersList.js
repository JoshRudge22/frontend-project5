import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import followStyles from '../../styles/Follow.module.css';

const FollowersList = ({ username }) => {
  const [followersList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowersList = async () => {
      try {
        const response = await axios.get(`/followers/${username}/`);
        console.log("API response for followers list:", response.data);
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
        console.error('Error fetching followers list:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFollowersList();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={followStyles.followersList}>
      <h2 className={followStyles.title}>Your Followers</h2>
      <ul className={followStyles.list}>
        {followersList.map((follower) => (
          <li className={followStyles.follow} key={follower.id}>
            <Link to={`/profile/${follower.follower_username}`}>
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