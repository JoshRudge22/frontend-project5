import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LikeList({ postId }) {
  console.log("Received postId:", postId);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/posts/${postId}/likes/`);
        setLikedPosts(response.data.usernames);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLikedPosts();
  }, [postId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {likedPosts.map((username) => (
            <li key={username}>{username}</li>
          ))}
        </ul>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default LikeList;