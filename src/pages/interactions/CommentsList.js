import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Comments from '../../components/interactions/Comments';
import LikeButton from '../../components/interactions/Likes';
import commentsListStyles from '../../styles/FeedPage.module.css';
import NoContentStyles from '../../styles/NoContent.module.css';
import logo from '../../media/logo.png';

const CommentsList = () => {
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

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
    return  (
    <div className={NoContentStyles.container}>
      <h2 className={NoContentStyles.message}>You have not left a comment on anyone's post.</h2>
      <img className={NoContentStyles.logo} src={logo} alt="Logo" />
      <h2 className={NoContentStyles.message}>
        <Link to='/'>Click Here</Link> to discover users you may like to comment on
      </h2>
    </div>
    )
  }

  return (
    <div>
      <h2 className={commentsListStyles.title}>Your Commented Posts</h2>
      <ul className={commentsListStyles.ul}>
        {commentedPosts.map(post => (
          <li className={commentsListStyles.container} key={post.id}>
            <div className={commentsListStyles.post}>
              <h3 className={commentsListStyles.username}>Post by: <Link to={`/profile/${post.owner}`}>{post.owner}</Link></h3>
              <img className={commentsListStyles.img} src={post.image} alt={post.caption} />
              <p className={commentsListStyles.caption}><b>{post.owner}</b>: {post.caption}</p>
              <div className={commentsListStyles.interactions}>
                <LikeButton postId={post.id} currentUser={currentUser} />
                <Comments postId={post.id} currentUser={currentUser} />
              </div>  
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;