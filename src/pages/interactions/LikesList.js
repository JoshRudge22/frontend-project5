import React, { useState, useEffect } from 'react';
import axios from 'axios';
import followStyles from '../../styles/Follow.module.css';


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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching liked users list:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLikedUsers();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={followStyles.followersList}>
      <h2 className={followStyles.title}>Users Who Liked This Post</h2>
      <ul className={followStyles.list}>
        {likedUsers.map((user) => (
          <li className={followStyles.follow} key={user.username}>
            <img
              className={followStyles.image}
              src={user.profileImage}
              alt={`${user.username}'s profile`}
            />
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikeList;