import React, { useState, useEffect } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';

const LikeButton = ({ postId, commentId }) => {
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                let response;
                if (postId) {
                    response = await axiosReq.get(`/likes/post/${postId}/`);
                } else if (commentId) {
                    response = await axiosReq.get(`/likes/comment/${commentId}/`);
                }
                setLikes(response.data);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, [postId, commentId]);

    const handleLike = async () => {
        try {
            if (postId) {
                await axiosRes.post('/likes/',{ post: postId });
                const response = await axiosReq.get(`/likes/post/${postId}/`);
                setLikes(response.data);
            } else if (commentId) {
                await axiosRes.post('/likes/', { comment: commentId });
                const response = await axiosReq.get(`/likes/comment/${commentId}/`);
                setLikes(response.data);
            }
            setHasLiked(true);
        } catch (error) {
            console.error('Error liking:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLike} disabled={hasLiked}>
                {hasLiked ? 'Liked' : 'Like'}
            </button>
            <span>{likes.length} Likes</span>
        </div>
    );
};

export default LikeButton;