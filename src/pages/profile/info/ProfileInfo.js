import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import profileStyles from '../../../styles/profiles/Profile.module.css';
import Spinner from 'react-bootstrap/Spinner';

const ProfileInfo = () => {
  const { profileId } = useParams();
  const currentUser = useCurrentUser();
  const [profileData, setProfileData] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/profiles/update/${profileId}/`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(`Failed to load profile data: ${error.response ? error.response.data : error.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      if (currentUser) {
        try {
          const [followerRes, followingRes] = await Promise.all([
            axios.get(`/profiles/${currentUser.username}/follower_count/`),
            axios.get(`/profiles/${currentUser.username}/following_count/`)
          ]);
          setFollowerCount(followerRes.data.follower_count);
          setFollowingCount(followingRes.data.following_count);
        } catch (error) {
          console.error('Error fetching follower/following count:', error);
          setError('Failed to load follower/following counts.');
        }
      }
    };

    fetchProfileData();
    fetchCounts();
  }, [profileId, currentUser]);

  if (loading) {
    return (
      <div className={profileStyles.loadingContainer}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className={profileStyles.errorMessage}>{error}</div>;
  }

  return (
    <Container className={profileStyles.container}>
      <h2 className={profileStyles.heading}>Welcome {profileData.user}</h2>
      <img 
        className={profileStyles.image} 
        src={profileData.profile_image || '/path/to/default-image.jpg'} 
        alt={`${profileData.full_name}'s profile`} 
        onError={(e) => e.target.src = '/path/to/default-image.jpg'} // Fallback image on error
      />
      <p className={profileStyles.info}><span className={profileStyles.span}>Full Name:</span> {profileData.full_name}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Bio:</span> {profileData.bio}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Location:</span> {profileData.location}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Followers:</span> {followerCount}</p>
      <p className={profileStyles.info}><span className={profileStyles.span}>Following:</span> {followingCount}</p>
    </Container>
  );
};

export default ProfileInfo;
