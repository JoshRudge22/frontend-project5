import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Comments from '../../components/interactions/Comments';
import LikeButton from '../../components/interactions/Likes';
import feedStyles from '../../styles/FeedPage.module.css';

const FeedPage = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await axios.get('/feed/');
        setFeedData(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFeedData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className={feedStyles.title}>Discover Feed!</h2>
      <ul className={feedStyles.ul}>
        {feedData.map(item => (
          <li key={item.id} className={feedStyles.container}>
            <div className={feedStyles.post}>
              <Link to={`/profile/${item.user.username}`} className={feedStyles.username}>
                {item.user.username}
              </Link>
              <h3>{item.caption}</h3>
              {item.image && (
                <img className={feedStyles.img} src={item.image} alt={item.caption} />
              )}
              <div className={feedStyles.interactions}>
                <LikeButton postId={item.id} />
                <Comments postId={item.id} owner={item.user.username} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;