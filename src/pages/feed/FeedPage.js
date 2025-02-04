import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Comments from "../../components/interactions/Comments";
import Likes from "../../components/interactions/Likes";
import feedStyles from "../../styles/FeedPage.module.css";
import Spinner from "../../components/Spinner";
import defaultAvatar from "../../media/man.jpg";

const FeedPage = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/signin");
    }
  }, [currentUser, history]);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await axios.get("/feed/?limit=5&offset=0");
        setFeedData(response.data.results || []);
        setNextUrl(response.data.next);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedData();
  }, []);

  const fetchMoreData = async () => {
    if (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        setFeedData((prevFeedData) => [...prevFeedData, ...(response.data.results || [])]);
        setNextUrl(response.data.next);
        if (!response.data.next) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!feedData || feedData.length === 0) return <p>No posts available.</p>;

  return (
    <InfiniteScroll dataLength={feedData.length} next={fetchMoreData} hasMore={hasMore} loader={<h4>Loading more posts...</h4>}>
      <h2 className={feedStyles.title}>Discover Feed</h2>
      <ul className={feedStyles.ul}>
        {feedData.map((item) => (
          <li key={item.id} className={feedStyles.container}>
            <div className={feedStyles.post}>
              <Link to={`/profiles/username/${item.owner}`} className={feedStyles.username}>
                {item.owner}
              </Link>
              <img className={feedStyles.img} src={item.image || defaultAvatar} alt={item.caption || "User Avatar"} />
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

export default FeedPage;