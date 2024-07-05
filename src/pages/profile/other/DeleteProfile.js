import React, { useEffect } from 'react';
import { axiosReq, axiosRes } from '../../../api/axiosDefaults';
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
      await axiosReq.delete(`/profiles/delete/${currentUser.username}/`);
      await axiosRes.post("dj-rest-auth/logout/");
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