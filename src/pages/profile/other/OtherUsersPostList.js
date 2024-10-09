import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Comments from '../../../components/interactions/Comments';
import LikeButton from '../../../components/interactions/Likes';
import feedStyles from '../../../styles/FeedPage.module.css';
import NoContentStyles from '../../../styles/NoContent.module.css';
import logo from '../../../media/logo.png';
import Spinner from 'react-bootstrap/Spinner'; // Importing a spinner component for loading state

const OtherUsersPostList = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/user/${username}/posts/?limit=5&offset=0`);
                setPosts(response.data.results);
                setNextUrl(response.data.next);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [username]);

    const fetchMorePosts = async () => {
        if (nextUrl) {
            try {
                const response = await axios.get(nextUrl);
                setPosts(prevPosts => [...prevPosts, ...response.data.results]);
                setNextUrl(response.data.next);
                if (!response.data.next) {
                    setHasMore(false);
                }
            } catch (error) {
                setError('Failed to load more posts. Please try again later.');
            }
        }
    };

    if (loading) {
        return (
            <div className={feedStyles.loading}>
                <Spinner animation="border" />
                <span>Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={feedStyles.error}>
                <span>{error}</span>
                <button onClick={() => window.location.reload()}>Retry</button> {/* Retry button */}
            </div>
        );
    }

    if (!Array.isArray(posts) || posts.length === 0) {
        return (
            <div className={NoContentStyles.container}>
                <h2 className={NoContentStyles.message}>No posts available for {username}.</h2>
                <img className={NoContentStyles.logo} src={logo} alt="Logo" />
                <h2 className={NoContentStyles.message}>
                    <Link to='/'>Click Here</Link> to discover more posts.
                </h2>
            </div>
        );
    }

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading more posts...</h4>}
        >
            <h1 className={feedStyles.title}>{username}'s Posts</h1>
            {posts.map(post => (
                <div key={post.id} className={feedStyles.container}>
                    <div className={feedStyles.post}>
                        {post.image ? (
                            <img className={feedStyles.img} src={post.image} alt="Post" onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/placeholder/image.jpg'; }} />
                        ) : (
                            <img className={feedStyles.img} src='/path/to/placeholder/image.jpg' alt="Placeholder" />
                        )}
                        <p className={feedStyles.caption}>{post.caption}</p>
                        <div className={feedStyles.interactions}>
                            <LikeButton postId={post.id} currentUser={currentUser} />
                            <Comments postId={post.id} currentUser={currentUser} />
                        </div>
                    </div>
                </div>
            ))}
        </InfiniteScroll>
    );
};

export default OtherUsersPostList;
