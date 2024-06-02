import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Likes = ({ postId }) => {
  const [likes, setLikes] = useState([]);
  const [userLiked, setUserLiked] = useState(false);

  const fetchLikes = useCallback(async () => {
    try {
      const response = await axios.get(`/likes/${postId}/`);
      if (Array.isArray(response.data)) {
        setLikes(response.data);
        const userHasLiked = response.data.some(like => like.owner === 'currentUser');
        setUserLiked(userHasLiked);
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

  const handleLike = async () => {
    try {
      await axios.post('/likes/', { post: postId });
      fetchLikes();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={userLiked}>
        {userLiked ? 'Liked' : 'Like'}
      </button>
      <p>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</p>
      <ul>
        {Array.isArray(likes) && likes.map(like => (
          <li key={like.id}>{like.owner}</li>
        ))}
      </ul>
    </div>
  );
};

export default Likes;