import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import likeStyles from '../../styles/Likes.module.css'
import buttonStyles from '../../styles/Buttons.module.css'

function Likes({ postId, userId }) {
  const [liked, setLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/likes/`);
        const likes = response.data.usernames;

        if (Array.isArray(likes)) {
          setLikesCount(likes.length);
          setLiked(likes.includes(userId));
        } else {
          console.error("Expected an array of usernames.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to load likes');
      }
    };

    fetchLikes();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await axios.post(`/posts/${postId}/like/`);
        setLikesCount(likesCount + 1);
        setLiked(true);
        setErrorMessage('');
      } else {
        await axios.delete(`/posts/${postId}/like/`);
        setLikesCount(likesCount - 1);
        setLiked(false);
        setErrorMessage('');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to update like status');
    }
  };

  return (
    <div>
    <div>
      <Button className={buttonStyles.like} onClick={handleLike} disabled={liked === null}>
        {liked ? 'Unlike' : 'Like'}
      </Button>
      <div>
      <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
    <Link className={likeStyles.link} to="/users/liked-posts">View liked posts</Link>
  </div>
  );
}

export default Likes;