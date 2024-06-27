import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import likeStyles from '../../styles/Likes.module.css';

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

  if (!Array.isArray(likedPosts) || likedPosts.length === 0) {
    return <p>You haven't liked any posts yet. <Link to='/'>Click here</Link> to discover other users posts</p>;
  }

  return (
    <div>
      <ul>
        {likedPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.caption}</h2>
            <p>Posted by:<Link to={`/profile/${post.owner}`}>{post.owner}</Link></p>
            <img className={likeStyles.img} src={post.image} alt={post.caption} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikeList;