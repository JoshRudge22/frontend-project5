import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import feedStyles from '../../styles/FeedPage.module.css';

const LikedPost = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedBy, setLikedBy] = useState({});

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get('/users/liked-posts');
        setLikedPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedPosts();
  }, []);

  useEffect(() => {
    const fetchLikedBy = async () => {
      const newLikedBy = {};
      for (const post of likedPosts) {
        try {
          const response = await axios.get(`/posts/${post.id}/likes`);
          newLikedBy[post.id] = response.data.usernames || [];
        } catch (error) {
          console.error(error);
        }
      }
      setLikedBy(newLikedBy);
    };

    if (likedPosts.length > 0) {
      fetchLikedBy();
    }
  }, [likedPosts]);

  return (
    <div>
      <h2>Liked Posts</h2>
      <ul>
        {likedPosts.map((post) => (
          <li key={post.id}>
            <div className={feedStyles.post}>
            <img className={feedStyles.img} src={post.image} alt={`Post ${post.id}`} />
            <h4>Liked By:</h4>
            <ul>
              {likedBy[post.id] && likedBy[post.id].length > 0 ? (
                likedBy[post.id].map((username) => (
                  <li key={username}>
                    <Link to={`/profile/${username}`}>{username}</Link>
                  </li>
                ))
              ) : (
                <li>No likes yet</li>
              )}
            </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedPost;