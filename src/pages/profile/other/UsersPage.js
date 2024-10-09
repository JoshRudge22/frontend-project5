import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useParams, Link } from 'react-router-dom';
import FollowButton from '../../../components/follow/FollowButton';
import userprofileStyles from '../../../styles/profiles/UsersPage.module.css';
import Spinner from 'react-bootstrap/Spinner'; // Import a spinner component

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
        const [profileResponse, followerResponse, followingResponse] = await Promise.all([
          axios.get(`/profiles/${username}/`),
          axios.get(`/profiles/${username}/follower_count/`),
          axios.get(`/profiles/${username}/following_count/`)
        ]);
        
        setProfileData(profileResponse.data);
        setFollowerCount(followerResponse.data.follower_count);
        setFollowingCount(followingResponse.data.following_count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch profile data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return (
      <div className={userprofileStyles.loading}>
        <Spinner animation="border" /> {/* Loading spinner */}
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className={userprofileStyles.error}>Error: {error}</p>; // More user-friendly error message
  }

  if (!profileData) {
    return <p className={userprofileStyles.error}>No profile data available</p>;
  }

  return (
    <Container className={userprofileStyles.container}>
      <h2 className={userprofileStyles.heading}>{profileData.username}'s Profile</h2>
      <img
        className={userprofileStyles.image}
        src={profileData.profile_image || '/path/to/placeholder/image.jpg'} // Placeholder for missing image
        alt="Profile"
      />
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Full Name:</span> {profileData.full_name}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Bio:</span> {profileData.bio}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Location:</span> {profileData.location}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Followers:</span> {followerCount}</p>
      <p className={userprofileStyles.info}><span className={userprofileStyles.span}>Following:</span> {followingCount}</p>
      <p className={`${userprofileStyles.info} ${userprofileStyles.span}`}>
        Click here to view: <Link className={userprofileStyles.span} to={`/user/${username}/posts/`}>{username}'s Posts</Link>
      </p>
      <FollowButton username={username} profileId={profileData.id} />
    </Container>
  );
};

export default UsersPage;
