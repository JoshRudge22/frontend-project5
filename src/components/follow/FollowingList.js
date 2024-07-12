import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import followStyles from '../../styles/Follow.module.css';

const FollowingList = ({ username }) => {
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get(`/following/${username}/`);
        console.log("API response for following list:", response.data);
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
        console.error('Error fetching following list:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFollowingList();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className={followStyles.title}>You Are Following:</h2>
      <ul className={followStyles.list}>
        {followingList.map((following) => (
          <li className={followStyles.follow} key={following.id}>
            <Link to={`/profile/${following.following_username}`}>
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