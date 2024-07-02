import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import profileStyles from '../../../styles/profiles/Profile.module.css';

const ProfileInfo = () => {
  const { profileId } = useParams();
  const currentUser = useCurrentUser();
  const [profileData, setProfileData] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/profiles/update/${profileId}/`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchFollowerCount = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`/profiles/${currentUser.username}/follower_count/`);
          setFollowerCount(response.data.follower_count);
        } catch (error) {
          console.error('Error fetching follower count:', error);
        }
      }
    };

    const fetchFollowingCount = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`/profiles/${currentUser.username}/following_count/`);
          setFollowingCount(response.data.following_count);
        } catch (error) {
          console.error('Error fetching following count:', error);
        }
      }
    };

    fetchProfileData();
    fetchFollowerCount();
    fetchFollowingCount();
  }, [profileId, currentUser]);

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
      <p className={profileStyles.info}><span className={profileStyles.span}>Followers:</span> {followerCount}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Following:</span> {followingCount}</p>
    </Container>
  );
};

export default ProfileInfo;