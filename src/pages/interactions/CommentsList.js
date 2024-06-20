import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommentsList = () => {
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentedPosts = async () => {
      try {
        const response = await axios.get(`/comments/user/4`); /*Need to find the correct id*/
        setCommentedPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching commented posts:', error);
        setError('Error fetching commented posts');
        setLoading(false);
      }
    };

    fetchCommentedPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(commentedPosts) || commentedPosts.length === 0) {
    return <p>No commented posts found</p>;
  }

  return (
    <div>
      <h2>Your Commented Posts</h2>
      <ul>
        {commentedPosts.map(post => (
          <li key={post.id}>
            <p>{post.caption}</p>
            <p>Post by: 
              <Link to={`/profile/${post.owner}`}>
                {post.owner}
              </Link>
            </p>
            <img src={post.image} alt={post.caption} />
            <p>At: {post.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;