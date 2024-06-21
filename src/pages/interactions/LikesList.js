import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LikeList() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/users/liked-posts/');
        setLikedPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLikedPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Likes:</h2>
      <ul>
        {likedPosts.map((post) => (
          <li key={post.id}>
            <p>{post.caption}</p>
            <img src={post.image} alt={post.caption} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikeList;