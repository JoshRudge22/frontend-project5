import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FollowingList = ({ username }) => {
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get(`/following/${username}/`);
        console.log("API response for following list:", response.data);
        setFollowingList(response.data.results);
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
      <h2>{username} is following</h2>
      <ul>
        {followingList.map(following => (
          <li key={following.id}>
            <Link to={`/profile/${following.following_username}`}>
              {following.following_username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;