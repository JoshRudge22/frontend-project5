import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Comments from '../../components/interactions/Comments';
import LikeButton from '../../components/interactions/Likes';
import commentsListStyles from '../../styles/FeedPage.module.css';

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
      <ul className={commentsListStyles.ul}>
        {commentedPosts.map(post => (
          <li className={commentsListStyles.container} key={post.id}>
            <div className={commentsListStyles.post}>
              <h3 className={commentsListStyles.username}>Post by: <Link to={`/profile/${post.owner}`}>{post.owner}</Link></h3>
              <h3>{post.caption}</h3>
              <img className={commentsListStyles.img} src={post.image} alt={post.caption} />
            <div className={commentsListStyles.interactions}>
              <LikeButton postId={post.id} />
              <Comments postId={post.id} owner={post.owner} />
            </div>  
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default CommentsList;