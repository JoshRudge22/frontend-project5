import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import likeStyles from '../../styles/likes/Likeslist.module.css'

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
      <h2 className={likeStyles.pagetitle}>Liked Posts</h2>
      <Container className={likeStyles.container}>
        <ul className={likeStyles.list}>
          {likedPosts.map((post) => (
            <li className={likeStyles.post} key={post.id}>
              <img 
              className={likeStyles.img} 
              src={post.image} 
              alt={`Post ${post.id}`} />
              <h4 className={likeStyles.h4}>Liked By:</h4>
              <ul className={likeStyles.username}>
                {likedBy[post.id] && likedBy[post.id].length > 0 ? (
                  likedBy[post.id].map((username) => (
                    <li className={likeStyles.usernamelist} key={username}>
                      <Link to={`/profile/${username}`}>{username}</Link>
                    </li>
                  ))
                ) : (
                  <li className={likeStyles.nolikes} >No likes yet</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default LikedPost;