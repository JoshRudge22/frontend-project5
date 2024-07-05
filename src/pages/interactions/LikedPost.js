import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Comments from '../../components/interactions/Comments';
import LikeButton from '../../components/interactions/Likes';
import likeStyles from '../../styles/likes/Likeslist.module.css'

const LikedPost = () => {
  const [likedPosts, setLikedPosts] = useState([]);

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

  return (
    <div>
      <h2 className={likeStyles.pagetitle}>Liked Posts</h2>
      <Container className={likeStyles.container}>
        <ul className={likeStyles.list}>
          {likedPosts.map((post) => (
            <li className={likeStyles.container} key={post.id}>
              <div className={likeStyles.post}>
                <h3>{post.caption}</h3>
                <img className={likeStyles.img} src={post.image} alt={`Post ${post.id}`} />
                <div className={likeStyles.interactions}>
                  <LikeButton postId={post.id} />
                  <Comments postId={post.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default LikedPost;