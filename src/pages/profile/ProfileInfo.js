import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import profileStyles from '../../styles/profilestyles/Profile.module.css';

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
    <Container className={profileStyles.container}>
      <h2 className={profileStyles.heading}>Welcome, {profileData.user}</h2>
      <p><span>Full Name:</span> {profileData.full_name}</p>
      <img className={profileStyles.image} src={profileData.profile_image} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
      <p><span>Bio:</span> {profileData.bio}</p>
      <p><span>Email:</span> {profileData.email}</p>
      <p><span>Location:</span> {profileData.location}</p>
    </Container>
  );
};

export default ProfileInfo;