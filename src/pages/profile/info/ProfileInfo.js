import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import profileStyles from '../../../styles/Profile.module.css';

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
      <h2 className={profileStyles.heading}>Welcome {profileData.user}</h2>
      <img className={profileStyles.image} src={profileData.profile_image} alt="Profile" />
      <p className={profileStyles.info}><span className={profileStyles.span}>Full Name:</span> {profileData.full_name}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Bio:</span> {profileData.bio}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Location:</span> {profileData.location}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Followers:</span> {profileData.location}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Following:</span> {profileData.location}</p>
    </Container>
  );
};

export default ProfileInfo;