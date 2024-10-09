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
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchLikes = async () => {
      setLoading(true); // Set loading to true when fetching
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
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchLikes();
  }, [postId, currentUser]);

  const toggleLike = async () => {
    setLoading(true); // Set loading to true when toggling like
    try {
      if (!liked) {
        await axios.post(`/posts/${postId}/like/`);
        setLikesCount((prevCount) => prevCount + 1);
        setLiked(true);
      } else {
        await axios.delete(`/posts/${postId}/like/`);
        setLikesCount((prevCount) => prevCount - 1);
        setLiked(false);
      }
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to update like status');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <div>
        <span className={likeStyles.count}>
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </span>
        {errorMessage && <p className={likeStyles.error}>{errorMessage}</p>}
      </div>
      {currentUser ? (
        <>
          <Button
            className={buttonStyles.like}
            onClick={toggleLike}
            disabled={loading || liked === null} // Disable button while loading
            aria-pressed={liked} // Accessibility
          >
            {loading ? (
              <span>Loading...</span> // Loading feedback
            ) : (
              <i className={`fa-regular ${liked ? 'fa-thumbs-down' : 'fa-thumbs-up'}`}></i>
            )}
          </Button>
          <Link className={likeStyles.link} to={`/posts/${postId}/likes`}>
            View likes
          </Link>
        </>
      ) : (
        <p>Please log in to like this post.</p>
      )}
    </div>
  );
}

export default Likes;
