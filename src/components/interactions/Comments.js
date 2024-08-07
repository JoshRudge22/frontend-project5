import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import commentStyles from '../../styles/comments/Comments.module.css';
import buttonStyles from '../../styles/Buttons.module.css';

const Comments = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments/`);
        setComments(response.data.results);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Error fetching comments');
      }
    };

    // Fetch comments only if currentUser is available
    if (currentUser) {
      fetchComments();
    } else {
      // Reset comments when currentUser is not available
      setComments([]);
    }
  }, [postId, currentUser]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/comments/`, {
        content: newComment,
        post: postId,
      });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Error adding comment');
    }
  };

  const handleEditComment = async (id) => {
    try {
      const response = await axios.patch(`/comments/${id}/`, { content: editContent });
      setComments(comments.map(comment => comment.id === id ? response.data : comment));
      setEditComment(null);
    } catch (error) {
      console.error('Error editing comment:', error);
      setError('Error editing comment');
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`/comments/${id}/`);
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Error deleting comment');
    }
  };

  if (!currentUser) {
    return <p>Please log in to add a comment.</p>;
  }

  return (
    <Container>
      {error && <p>{error}</p>}
      <div>
        <h3>Comments</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            {editComment === comment.id ? (
              <>
                <Form.Group>
                  <Form.Control as="textarea" rows={3} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                </Form.Group>
                <Button className={buttonStyles.edit} onClick={() => handleEditComment(comment.id)}>Save</Button>
                <Button className={buttonStyles.delete} onClick={() => setEditComment(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <p>
                  <Link className={commentStyles.username} to={`/profile/${comment.user}`}>
                    {comment.user}
                  </Link>{" "}
                  says: {comment.content}
                </p>
                {currentUser && currentUser.username === comment.user && (
                  <>
                    <Button className={buttonStyles.edit} onClick={() => { setEditComment(comment.id); setEditContent(comment.content); }}>Edit</Button>
                    <Button className={buttonStyles.delete} onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <h3 className={commentStyles.add}>Add a Comment</h3>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button className={buttonStyles.save} onClick={handleAddComment}>Submit</Button>
      </div>
    </Container>
  );
};

export default Comments;