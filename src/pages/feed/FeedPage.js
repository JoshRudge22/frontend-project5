import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/FeedPage.module.css';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/feed/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('There was an error fetching the posts!', error);
        }
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Feed</h1>
            <div className={styles.feed}>
                {posts.length === 0 ? (
                    <p className={styles.noPostsMessage}>No posts have been created</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className={styles.post}>
                            <div><strong>User:</strong> {post.user}</div>
                            <div><strong>Caption:</strong> {post.caption}</div>
                            {post.image && <img src={post.image} alt="Post" />}
                            {post.video && <video src={post.video} controls />}
                            <div><strong>Created at:</strong> {new Date(post.created_at).toLocaleString()}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FeedPage;