import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    bio: "",
    profileImage: null,
  });

  useEffect(() => {
    
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
    formDataToSend.append('profileImage', formData.profileImage);
    try {
      await axios.post('/profiles/<int:pk>/', formDataToSend);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;