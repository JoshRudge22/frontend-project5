import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import listStyles from '../../styles/likes/Likeslist.module.css';

function LikeList({ postId }) {
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/likes/`);
        const likedUsernames = response.data.usernames;

        const likedUsersWithImages = await Promise.all(
          likedUsernames.map(async (username) => {
            const profileResponse = await axios.get(`/profiles/${username}/`);
            return {
              username,
              profileImage: profileResponse.data.profile_image,
            };
          })
        );

        setLikedUsers(likedUsersWithImages);
      } catch (error) {
        console.error('Error fetching liked users list:', error);
        setError('Failed to load liked users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedUsers();
  }, [postId]);

  if (loading) {
    return <div className={listStyles.loader}>Loading...</div>; // Consider adding a spinner or animation
  }

  if (error) {
    return <p className={listStyles.error}>{error}</p>;
  }

  return (
    <div className={listStyles.followersList}>
      <h2 className={listStyles.title}>Users Who Liked This Post</h2>
      {likedUsers.length === 0 ? (
        <p>No one has liked this post yet.</p>
      ) : (
        <ul className={listStyles.list}>
          {likedUsers.map((user) => (
            <li className={listStyles.follow} key={user.username}>
              <Link to={`/profile/${user.username}`} className={listStyles.link}>
                <img
                  className={listStyles.image}
                  src={user.profileImage}
                  alt={`${user.username}'s profile`}
                />
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LikeList;
