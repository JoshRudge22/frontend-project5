import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Likes = ({ postId, likeTypes }) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLikes = useCallback(async () => {
    try {
      const response = await axios.get(`/likes/${postId}/`);
      if (Array.isArray(response.data)) {
        setLikes(response.data);
      } else {
        console.error('Invalid response format: expected an array.');
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLike = async (likeType) => {
    setLoading(true);
    try {
      await axios.post('/likes/', { post: postId, type: likeType });
      fetchLikes();
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => handleLike('heart')} disabled={loading}>
        <i className="fa-solid fa-heart"></i>
      </button>
      <button onClick={() => handleLike('laugh')} disabled={loading}>
        <i className="fa-solid fa-face-grin-squint-tears"></i>
      </button>
      <button onClick={() => handleLike('cry')} disabled={loading}>
        <i className="fa-solid fa-face-sad-cry"></i>
      </button>
      <button onClick={() => handleLike('thumbsDown')} disabled={loading}>
        <i className="fa-solid fa-thumbs-down"></i>
      </button>
      <p>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</p>
      <ul>
        {Array.isArray(likes) && likes.map(like => (
          <li key={like.id}>{like.owner} liked with {like.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default Likes;