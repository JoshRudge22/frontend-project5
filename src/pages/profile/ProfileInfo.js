import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import profileStyles from '../../styles/Profile.module.css';

const ProfileInfo = () => {
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/profiles/update/${profileId}/`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [profileId]); 

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={profileStyles.container}>
      <h2 className={profileStyles.heading}>Welcome, {profileData.user}</h2>
      <p>Full Name: {profileData.full_name}</p>
      <img src={profileData.profile_image} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
      <p>Bio: {profileData.bio}</p>
      <p>Email: {profileData.email}</p>
      <p>Location: {profileData.location}</p>
    </div>
  );
};

export default ProfileInfo;