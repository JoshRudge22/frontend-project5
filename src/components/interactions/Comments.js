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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await axios.get(`/posts/${postId}/comments/`);
        setComments(response.data.results);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Error fetching comments');
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    if (currentUser) {
      fetchComments();
    } else {
      setComments([]);
    }
  }, [postId, currentUser]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      setError('Comment cannot be empty.');
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`/posts/${postId}/comments/`, {
        content: newComment,
        post: postId,
      });
      setComments([response.data, ...comments]);
      setNewComment('');
      setError(null); // Clear error after successful submission
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Error adding comment');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleEditComment = async (id) => {
    if (editContent.trim() === '') {
      setError('Comment cannot be empty.');
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.patch(`/comments/${id}/`, { content: editContent });
      setComments(comments.map(comment => comment.id === id ? response.data : comment));
      setEditComment(null);
      setEditContent('');
      setError(null); // Clear error after successful edit
    } catch (error) {
      console.error('Error editing comment:', error);
      setError('Error editing comment');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleDeleteComment = async (id) => {
    setLoading(true); // Set loading state to true
    try {
      await axios.delete(`/comments/${id}/`);
      setComments(comments.filter(comment => comment.id !== id));
      setError(null); // Clear error after successful deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Error deleting comment');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  if (!currentUser) {
    return <p>Please log in to add a comment.</p>;
  }

  return (
    <Container>
      {error && <p className={commentStyles.error}>{error}</p>}
      <div>
        <h3>Comments</h3>
        {loading && <p>Loading comments...</p>} {/* Loading state */}
        {comments.map(({ id, user, content }) => (
          <div key={id}>
            {editComment === id ? (
              <>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    aria-label="Edit comment"
                  />
                </Form.Group>
                <Button className={buttonStyles.edit} onClick={() => handleEditComment(id)}>Save</Button>
                <Button className={buttonStyles.delete} onClick={() => setEditComment(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <p>
                  <Link className={commentStyles.username} to={`/profile/${user}`}>
                    {user}
                  </Link>{" "}
                  says: {content}
                </p>
                {currentUser && currentUser.username === user && (
                  <>
                    <Button className={buttonStyles.edit} onClick={() => { setEditComment(id); setEditContent(content); }}>Edit</Button>
                    <Button className={buttonStyles.delete} onClick={() => handleDeleteComment(id)}>Delete</Button>
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
            aria-label="Add new comment"
          />
        </Form.Group>
        <Button className={buttonStyles.save} onClick={handleAddComment} disabled={loading}> {/* Disable during loading */}
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </Container>
  );
};

export default Comments;
