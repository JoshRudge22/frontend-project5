import React, { useState, useEffect } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import { Form, Button } from 'react-bootstrap';
import commentStyles from '../styles/Comments.module.css';
import buttonStyles from '../styles/Buttons.module.css';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) {
            console.error('Post ID is not defined.');
            setError('Post ID is not defined.');
            return;
        }

        const fetchComments = async () => {
            try {
                const response = await axiosReq.get(`/posts/${postId}/comments/`);
                setComments(response.data.results);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Error fetching comments');
            }
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (!postId) {
            console.error('Post ID is not defined.');
            setError('Post ID is not defined.');
            return;
        }

        console.log("Adding comment to post ID:", postId);
        console.log("Comment content:", newComment);

        try {
            const response = await axiosReq.post(`/posts/${postId}/comments/`, { 
                content: newComment, 
                post: postId,
            });
            setComments([response.data, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
            setError('Error adding comment');
        }
    };

    const handleEditComment = async (id) => {
        try {
            const response = await axiosReq.patch(`/comments/${id}/`, { content: editContent });
            setComments(comments.map(comment => comment.id === id ? response.data : comment));
            setEditComment(null);
        } catch (error) {
            console.error('Error editing comment:', error);
            setError('Error editing comment');
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            await axiosReq.delete(`/comments/${id}/`);
            setComments(comments.filter(comment => comment.id !== id));
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Error deleting comment');
        }
    };

    return (
        <div className={commentStyles.container}>
            {error && <p>{error}</p>}
            <div>
                <h3>All Comments</h3>
                {comments.map(comment => (
                    <div key={comment.id}>
                        {editComment === comment.id ? (
                            <>
                                <Form.Group>
                                    <Form.Control as="textarea" rows={3} value={editContent} onChange={(e) => setEditContent(e.target.value)}/>
                                </Form.Group>
                                <Button className={buttonStyles.edit} onClick={() => handleEditComment(comment.id)}>Save</Button>
                                <Button className={buttonStyles.delete} onClick={() => setEditComment(null)}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                 <p>{comment.owner} says: {comment.content}</p>
                                <Button className={buttonStyles.edit} onClick={() => { setEditComment(comment.id); setEditContent(comment.content); }}>Edit</Button>
                                <Button className={buttonStyles.delete} onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3>Add a Comment</h3>
                <Form.Group>
                    <Form.Control className={commentStyles.delete}
                        as="textarea"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </Form.Group>
                <Button className={buttonStyles.save} onClick={handleAddComment}>Submit</Button>
            </div>
        </div>
    );
};

export default Comments;