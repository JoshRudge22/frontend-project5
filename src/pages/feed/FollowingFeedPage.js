import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Comments from '../../components/interactions/Comments';
import Likes from '../../components/interactions/Likes';
import feedStyles from '../../styles/FeedPage.module.css';
import NoContentStyles from '../../styles/NoContent.module.css';
import logo from '../../media/logo.png';


const FollowingFeedPage = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchFollowingFeed = async () => {
      try {
        const response = await axios.get('/feed/following/?limit=5&offset=0');
        setFeedData(response.data.results);
        setNextUrl(response.data.next);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFollowingFeed();
  }, []);

  const fetchMoreData = async () => {
    if (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        setFeedData(prevFeedData => [...prevFeedData, ...response.data.results]);
        setNextUrl(response.data.next);
        if (!response.data.next) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(feedData) || feedData.length === 0) {
    return (
      <div className={NoContentStyles.container}>
        <h2 className={NoContentStyles.message}>No posts have been created from the users you are following.</h2>
        <img className={NoContentStyles.logo} src={logo} alt="Logo" />
        <h2 className={NoContentStyles.message}>
          <Link to='/'>Click Here</Link> to discover users you may like
        </h2>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={feedData.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <h2 className={feedStyles.title}>Following Feed!</h2>
      <ul className={feedStyles.ul}>
        {feedData.map((item) => (
          <li key={item.id} className={feedStyles.container}>
            <div className={feedStyles.post}>
              <Link to={`/profile/${item.owner}`} className={feedStyles.username}>
                {item.owner}
              </Link>
              {item.image && (
                <img className={feedStyles.img} src={item.image} alt={item.caption} />
              )}
               <p className={feedStyles.caption}><b>{item.owner}</b>: {item.caption}</p>
              <div className={feedStyles.interactions}>
                <Likes postId={item.id} currentUser={currentUser} />
                <Comments postId={item.id} currentUser={currentUser} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default FollowingFeedPage;