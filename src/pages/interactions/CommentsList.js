import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Comments from '../../components/interactions/Comments';
import commentsStyles from '../../styles/comments/CommentsList.module.css'

const CommentsList = () => {
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentedPosts = async () => {
      try {
        const response = await axios.get(`/comments/user/`);
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
    return <p>You've not commented on anyones post. <Link to='/'>Click here</Link> to discover other users posts</p>;
  }

  return (
    <div>
      <h2>Your Commented Posts</h2>
      <Container className={commentsStyles.container}>
        <ul className={commentsStyles.postlist}>
          {commentedPosts.map(post => (
            <li key={post.id}>
              <h3 className={commentsStyles.username}>Post by: <Link to={`/profile/${post.owner}`}>{post.owner}</Link></h3>
              <img className={commentsStyles.img} src={post.image} alt={post.caption} />
              <p className={commentsStyles.caption}>{post.caption}</p>
              <Comments postId={post.id} owner={post.owner} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default CommentsList;