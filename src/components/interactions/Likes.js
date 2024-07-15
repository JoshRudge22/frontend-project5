import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import likeStyles from '../../styles/likes/Likes.module.css';
import buttonStyles from '../../styles/Buttons.module.css';

function Likes({ postId, currentUser }) {
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
          if (currentUser) {
            setLiked(likes.includes(currentUser.username));
          }
        } else {
          console.error("Expected an array of usernames.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to load likes');
      }
    };

    fetchLikes();
  }, [postId, currentUser]);

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
        <div>
          <span className={likeStyles.count}>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        {currentUser ? (
          <>
          <Button className={buttonStyles.like} onClick={handleLike} disabled={liked === null}>
            {liked ? <i className="fa-regular fa-thumbs-down"></i> : <i className="fa-regular fa-thumbs-up"></i>}
          </Button>
          <Link className={likeStyles.link} to={`/posts/${postId}/likes`}>View likes</Link>
          </>
          ) : (
          <p>Please log in to like this post.</p>
          )}
      </div>
    </div>
  );
}

export default Likes;