import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import FeedPagestyles from '../../styles/FeedPage.module.css';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axiosReq.get('/posts/');
            console.log('API response:', response.data);

            if (Array.isArray(response.data.results)) {
                setPosts(response.data.results);
            } else {
                console.error('Error: API did not return an array of results');
                setPosts([]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className={FeedPagestyles.container}>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className={FeedPagestyles.post}>
                        {post.image && <img src={post.image} alt="Post" className={FeedPagestyles.postImage} />}
                        {post.video && <video src={post.video} controls className={FeedPagestyles.postVideo} />}
                        <p>{post.caption}</p>
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default FeedPage;