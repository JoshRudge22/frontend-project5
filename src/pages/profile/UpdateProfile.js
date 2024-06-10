import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import profileStyles from '../../styles/Profile.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import { useParams } from 'react-router-dom';

const UpdateProfile = () => {
  const { profileId } = useParams();
  const [formData, setFormData] = useState({
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
    <div className={profileStyles.container}>
      <h2 className={profileStyles.heading}>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
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
          <input type="file" id="profileImage" name="profileImage" onChange={handleInputChange} />
        </div>
        <div>
          <Form.Label htmlFor="bio">Bio:</Form.Label>
          <textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} />
        </div>
        <Button className={buttonStyles} type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;