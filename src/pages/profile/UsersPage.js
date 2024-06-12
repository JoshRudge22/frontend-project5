import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UsersPage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await axios.get(`/profiles/${username}/`);
        setProfileData(profileResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
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
      <p>Bio: {profileData.bio}</p>
      <img src={profileData.profile_image} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
    </div>
  );
};

export default UsersPage;