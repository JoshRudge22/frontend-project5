import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import profileStyles from '../../../styles/profiles/Profile.module.css';
import buttonStyles from '../../../styles/Buttons.module.css';

const UpdateProfile = () => {
  const { profileId } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    bio: '',
    profileImage: '',
    currentProfileImage: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const profileData = await getUserProfile(profileId);
        setFormData({
          fullName: profileData.full_name,
          email: profileData.email, // Ensure email is fetched
          location: profileData.location,
          bio: profileData.bio,
          currentProfileImage: profileData.profile_image,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  const getUserProfile = async (profileId) => {
    const response = await axios.get(`/profiles/update/${profileId}/`);
    return response.data;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ 
        ...formData, 
        profileImage: files[0], 
        currentProfileImage: URL.createObjectURL(files[0]) 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('full_name', formData.fullName);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('bio', formData.bio);
    if (formData.profileImage) {
      formDataToSend.append('profile_image', formData.profileImage);
    }
    try {
      await axios.patch(`/profiles/update/${profileId}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <Container className={profileStyles.container}>
      <h2 className={profileStyles.heading}>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="profileImage">Profile Picture:</Form.Label>
          {formData.currentProfileImage && (
            <div>
              <img className={profileStyles.image} src={formData.currentProfileImage} alt="Profile" />
            </div>
          )}
          <input type="file" id="profileImage" name="profileImage" onChange={handleInputChange} />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="fullName">Full Name:</Form.Label>
          <input className={profileStyles.input} type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="email">Email:</Form.Label>
          <input className={profileStyles.input} type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="bio">Bio:</Form.Label>
          <textarea className={profileStyles.textarea} id="bio" name="bio" value={formData.bio} onChange={handleInputChange} />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="location">Location:</Form.Label>
          <input className={profileStyles.input} type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} />
        </div>
        <Button className={buttonStyles.update} type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProfile;
