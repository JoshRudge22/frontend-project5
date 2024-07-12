import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Comments from '../../components/interactions/Comments';
import LikeButton from '../../components/interactions/Likes';
import likeStyles from '../../styles/likes/Likeslist.module.css';
import NoContentStyles from '../../styles/NoContent.module.css';
import logo from '../../logo.png';

const LikedPost = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const currentUser = useCurrentUser();

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

  if (!Array.isArray(likedPosts) || likedPosts.length === 0) {
    return (
      <div className={NoContentStyles.container}>
        <h2 className={NoContentStyles.message}>You have not liked any posts yet.</h2>
        <img className={NoContentStyles.logo} src={logo} alt="Logo" />
        <h2 className={NoContentStyles.message}>
          <Link to='/'>Click Here</Link> to discover posts you may like
        </h2>
      </div>
    );
  }

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
                  <LikeButton postId={post.id} currentUser={currentUser} />
                  <Comments postId={post.id} currentUser={currentUser} />
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