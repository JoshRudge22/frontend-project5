import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import followStyles from '../../styles/Follow.module.css'

const FollowersList = ({ username }) => {
  const [followersList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowersList = async () => {
      try {
        const response = await axios.get(`/followers/${username}/`);
        console.log("API response for followers list:", response.data);
        setFollowersList(response.data.results);
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
      <h2 className={followStyles.title}>Followers of are: {username}</h2>
      <ul className={followStyles.list}>
        {followersList.map(follower => (
          <li className={followStyles.follow} key={follower.id}>
            <Link to={`/profile/${follower.follower_username}`}>
              {follower.follower_username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;