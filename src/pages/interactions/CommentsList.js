import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Comments from '../../components/interactions/Comments'

const CommentsList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { profileId } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosReq.get(`comments/user/${profileId}`)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
        setLoading(false);
      });
  }, [profileId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id}>
                <Comments postId={post.id} owner={post.owner} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default CommentsList;