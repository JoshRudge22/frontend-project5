import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Comments from '../../components/interactions/Comments';
import LikeButton from '../../components/interactions/Likes';
import feedStyles from '../../styles/FeedPage.module.css';
import NoContentStyles from '../../styles/NoContent.module.css'
import logo from '../../logo.png';

const FollowingFeedPage = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowingFeed = async () => {
      try {
        const response = await axios.get('/feed/following/');
        setFeedData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFollowingFeed();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(feedData) || feedData.length === 0) {
    return (
      <>
        <h2 className={NoContentStyles.message}>No posts have been created from the users you are following.</h2>
        <img className={NoContentStyles.logo} src={logo} alt="Logo" />
        <h2 className={NoContentStyles.message}><Link to='/'>Click Here</Link> to discover users you may like</h2>
      </>
    );
  }

  return (
    <div>
      <h2 className={feedStyles.title}>Following Feed!</h2>
      <ul className={feedStyles.ul}>
        {feedData.map((item) => (
          <li key={item.id} className={feedStyles.container}>
            <div className={feedStyles.post}>
              <Link to={`/profile/${item.owner}`} className={feedStyles.username}>
                {item.owner}
              </Link>
              <h3>{item.caption}</h3>
              {item.image && (
                <img className={feedStyles.img} src={item.image} alt={item.caption} />
              )}
              <div className={feedStyles.interactions}>
                <LikeButton postId={item.id} />
                <Comments postId={item.id} owner={item.owner} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingFeedPage;