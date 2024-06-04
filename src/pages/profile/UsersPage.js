import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FollowButton from '../../components/Follow';


const UsersPage = () => {
  const { username } = useParams(); 
  const [profileData, setProfileData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await axios.get(`/profiles/${username}/`);
        setProfileData(profileResponse.data);

        const followersResponse = await axios.get(`/user/${profileResponse.data.id}/followers/`);
        setFollowers(followersResponse.data);

        const followingResponse = await axios.get(`/user/${profileResponse.data.id}/following/`);
        setFollowing(followingResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!profileData) {
    return <p>No profile data available</p>;
  }

  return (
    <div>
      <h2>{profileData.username}'s Profile</h2>
      <FollowButton userId={profileData.id} />
      <div>
        <h3>Followers: {Array.isArray(followers) ? followers.length : 0}</h3>
        <ul>
          {Array.isArray(followers) && followers.map(follower => (
            <li key={follower.id}>{follower.follower.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Following: {Array.isArray(following) ? following.length : 0}</h3>
        <ul>
          {Array.isArray(following) && following.map(user => (
            <li key={user.id}>{user.user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersPage;