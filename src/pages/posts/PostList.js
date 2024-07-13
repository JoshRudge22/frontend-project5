import React, { useEffect, useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Comments from '../../components/interactions/Comments';
import LikeButton from '../../components/interactions/Likes';
import feedStyles from '../../styles/FeedPage.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import NoContentStyles from '../../styles/NoContent.module.css';
import logo from '../../media/logo.png';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosReq.get('/posts/user/?limit=5&offset=0');
                setPosts(response.data.results);
                setNextUrl(response.data.next); 
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const fetchMorePosts = async () => {
        if (nextUrl) {
            try {
                const response = await axiosReq.get(nextUrl);
                setPosts(prevPosts => [...prevPosts, ...response.data.results]);
                setNextUrl(response.data.next);
                if (!response.data.next) {
                    setHasMore(false);
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleDeletePost = async (postId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) {
            return;
        }
        try {
            await axiosReq.delete(`/posts/${postId}/`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            setError('Error deleting post');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!Array.isArray(posts) || posts.length === 0) {
        return (
            <div className={NoContentStyles.container}>
                <h2 className={NoContentStyles.message}>No posts have been created by the users you are following.</h2>
                <img className={NoContentStyles.logo} src={logo} alt="Logo" />
                <h2 className={NoContentStyles.message}>
                    <Link to='/'>Click Here</Link> to discover users you may like
                </h2>
            </div>
        );
    }

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <h1 className={feedStyles.title}>Your Posts</h1>
            {posts.map(post => (
                <div key={post.id} className={feedStyles.container}>
                    <div className={feedStyles.post}>
                        {post.image && <img className={feedStyles.img} src={post.image} alt="Post" />}
                        <p className={feedStyles.caption}>{post.caption}</p>
                        <div className={feedStyles.interactions}>
                            <LikeButton postId={post.id} currentUser={currentUser} />
                            <Comments postId={post.id} currentUser={currentUser} />
                            <Button className={buttonStyles.deletepost} onClick={() => handleDeletePost(post.id)}>Delete Post</Button>
                        </div>
                    </div>
                </div>
            ))}
        </InfiniteScroll>
    );
};

export default PostList;