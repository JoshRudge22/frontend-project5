import React, { useEffect, useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import Comments from '../../components/interactions/Comments';
import feedStyles from '../../styles/FeedPage.module.css'
import buttonStyles from '../../styles/Buttons.module.css'

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosReq.get('/posts/user');
                setPosts(response.data.results);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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

    return (
        <div>
            <h1>Your Posts</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div className={feedStyles.container} key={post.id}>
                        {post.image && <img src={post.image} alt="Post" />}
                        {post.video && (
                            <video controls style={{ maxWidth: '100%' }}>
                                <source src={post.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <p>{post.caption}</p>
                        <Comments postId={post.id} />
                        <button className={buttonStyles.delete} onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default PostList;