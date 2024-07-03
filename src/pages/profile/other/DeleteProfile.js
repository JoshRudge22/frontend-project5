import React, { useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser, useSetCurrentUser } from '../../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';


const DeleteProfile = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      history.push('/signin');
    }
  }, [currentUser, history]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/profiles/delete/${currentUser.username}/`);
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push('/signin');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default DeleteProfile;