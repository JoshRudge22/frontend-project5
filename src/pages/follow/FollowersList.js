import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowerList = ({ username }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`/followers/${username}/`);
        setFollowers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followers:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Followers of {username}</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <span>{follower.username}</span>
            <span>({follower.following_count} followers)</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerList;