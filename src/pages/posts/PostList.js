import React, { useEffect, useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosReq.get('/posts/user');
                setPosts(response.data.results);  // Access the results array
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
                    <div key={post.id} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
                        {post.image && <img src={post.image} alt="Post" style={{ maxWidth: '100%' }} />}
                        {post.video && (
                            <video controls style={{ maxWidth: '100%' }}>
                                <source src={post.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <p>{post.caption}</p>
                    </div>
                ))
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default PostList;