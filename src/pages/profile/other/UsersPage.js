import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FollowButton from '../../../components/follow/FollowButton';
import userprofileStyles from '../../../styles/profiles/UsersPage.module.css';


const UsersPage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
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

    const fetchFollowerCount = async () => {
      try {
        const response = await axios.get(`/profiles/${username}/follower_count/`);
        setFollowerCount(response.data.follower_count);
      } catch (error) {
        console.error('Error fetching follower count:', error);
      }
    };

    const fetchFollowingCount = async () => {
      try {
        const response = await axios.get(`/profiles/${username}/following_count/`);
        setFollowingCount(response.data.following_count);
      } catch (error) {
        console.error('Error fetching following count:', error);
      }
    };

    fetchProfileData();
    fetchFollowerCount();
    fetchFollowingCount();
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
    <Container className={userprofileStyles.container}>
      <h2 className={userprofileStyles.heading}>{profileData.username}'s Profile</h2>
      <img
        className={userprofileStyles.image}  
        src={profileData.profile_image} 
        alt="Profile"/>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Full Name:</span> {profileData.full_name}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Bio:</span> {profileData.bio}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Location:</span> {profileData.location}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Followers:</span> {followerCount}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Following:</span> {followingCount}</p>
      <FollowButton username={username} profileId={profileData.id} />
    </Container>
  );
};

export default UsersPage;