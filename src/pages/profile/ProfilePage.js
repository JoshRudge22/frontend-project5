import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import profileStyles from '../../styles/Profile.module.css'
import buttonStyles from '../../styles/Buttons.module.css'

const getUserProfile = async () => {
  try {
    const response = await axios.get('/profiles/update/');
    return response.data;
  } catch (error) {
    console.error('Error retrieving authenticated user profile:', error);
    throw new Error('Failed to retrieve authenticated user profile.');
  }
};

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const [formData, setFormData] = useState({
    bio: "",
    profileImage: null,
    currentProfileImage: "",
    profileId: null
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getUserProfile();
        console.log('Fetched profile data:', profileData);
        setFormData({
          bio: profileData.bio,
          profileImage: null,
          currentProfileImage: profileData.profile_image,
          profileId: profileData.id
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('bio', formData.bio);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }
    try {
      if (!formData.profileId) {
        throw new Error('Profile ID is null');
      }
      await axios.put(`/profiles/${formData.profileId}/`, formDataToSend);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className={profileStyles.container}>
      <h2 className={profileStyles.heading}>Welcome, {currentUser.username}</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label htmlFor="bio">Bio:</Form.Label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="profileImage">Profile Picture:</Form.Label>
          {formData.currentProfileImage && (
            <div>
              <img
                src={formData.currentProfileImage}
                alt="Profile"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleInputChange}
          />
        </div>
        <Button className={buttonStyles} type="submit">Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfilePage;