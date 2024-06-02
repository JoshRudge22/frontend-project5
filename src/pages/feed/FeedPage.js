import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from '../../components/Comments';
import Likes from '../../components/Likes';
import feedStyles from '../../styles/FeedPage.module.css';

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
      <h2 className={feedStyles.title}>Your Feed!</h2>
      <ul className={feedStyles.ul}>
        {feedData.map(item => {
          return (
            <li key={item.id} className={feedStyles.container}>
                <h4 className={feedStyles.username}>{item.owner}</h4>
                <h3>{item.caption}</h3>
                {item.image && (
                <img src={item.image} alt={item.caption} />
                )}
                {item.video && (
                <video controls>
                    <source src={item.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <Comments postId={item.id} />
            <Likes postId={item.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FeedPage;