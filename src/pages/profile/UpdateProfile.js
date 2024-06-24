import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import profileStyles from '../../styles/profilestyles/Profile.module.css';
import buttonStyles from '../../styles/Buttons.module.css';


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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getUserProfile(profileId);
        console.log('Fetched profile data:', profileData);
        setFormData({
          fullName: profileData.full_name,
          email: profileData.email,
          location: profileData.location,
          bio: profileData.bio,
          currentProfileImage: profileData.profile_image,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [profileId]);

  const getUserProfile = async (profileId) => {
    try {
      const response = await axios.get(`/profiles/update/${profileId}/`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      throw new Error('Failed to retrieve user profile.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0], currentProfileImage: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('full_name', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('bio', formData.bio);
    if (formData.profileImage) {
      formDataToSend.append('profile_image', formData.profileImage);
    }
    try {
      axios.patch(`/profiles/update/${profileId}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <Container className={profileStyles.container}>
      <h2 className={profileStyles.heading}>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label htmlFor="profileImage">Profile Picture:</Form.Label>
          {formData.currentProfileImage && (
            <div>
              <img className={profileStyles.image}
                src={formData.currentProfileImage}
                alt="Profile"
              />
            </div>
          )}
          <input type="file" id="profileImage" name="profileImage" onChange={handleInputChange} />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="fullName">Full Name:</Form.Label>
          <input className={profileStyles.input} type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="bio">Bio:</Form.Label>
          <textarea  className={profileStyles.textarea} id="bio" name="bio" value={formData.bio} onChange={handleInputChange} />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="email">Email:</Form.Label>
          <input className={profileStyles.input} type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <Form.Label className={profileStyles.label} htmlFor="location">Location:</Form.Label>
          <input className={profileStyles.input} type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} />
        </div>
        <Button className={buttonStyles} type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProfile;