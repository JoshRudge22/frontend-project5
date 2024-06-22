import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LikeButton from '../../components/interactions/Likes';
import Comments from '../../components/interactions/Comments'
import feedStyles from '../../styles/FeedPage.module.css';
import likesStyles from '../../styles/Likes.module.css'

const FeedPage = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await axios.get('/feed/');
        setFeedData(response.data.results);
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

  if (!Array.isArray(feedData) || feedData.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <h2 className={feedStyles.title}>Discover Feed!</h2>
      <ul className={feedStyles.ul}>
        {feedData.map(item => {
          return (
            <li key={item.id} className={feedStyles.container}>
              <Link to={`/profile/${item.user.username}`} className={feedStyles.username}>
                {item.user.username}
              </Link>
              <h3>{item.caption}</h3>
              {item.image && (
                <img src={item.image} alt={item.caption} />
              )}
              <LikeButton className={likesStyles.likes} postId={item.id} />
              <Comments postId={item.id} owner={item.user.username}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FeedPage;