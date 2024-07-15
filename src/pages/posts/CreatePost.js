import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosReq } from "../../api/axiosDefaults";
import  Container from 'react-bootstrap/Container';
import  Form from 'react-bootstrap/Form';
import  Button from 'react-bootstrap/Button';
import Poststyles from '../../styles/CreatingPost.module.css';
import Buttonstyles from '../../styles/Buttons.module.css';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImagePreview('');
        }
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!caption.trim()) newErrors.caption = "Caption cannot be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        const formData = new FormData();
        if (image) formData.append('image', image);
        formData.append('caption', caption);

        try {
            const response = await axiosReq.post('/posts/', formData);
            console.log('Post created successfully:', response.data);
            history.push('/');
        } catch (error) {
            console.error('There was an error creating the post!', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: "An error occurred while creating the post" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className={Poststyles.container}>
            <h1 className={Poststyles.title}>Create Post</h1>
            <Form className={Poststyles.form} onSubmit={handleSubmit}>
                <div>
                    <Form.Label className={Poststyles.label} htmlFor="image">Image:</Form.Label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" className={Poststyles.preview} />}
                    {errors.image && <p className={Poststyles.error}>{errors.image}</p>}
                </div>
                <div>
                    <Form.Label className={Poststyles.label} htmlFor="caption">Caption:</Form.Label>
                    <textarea id="caption" value={caption} onChange={handleCaptionChange} className={Poststyles.textarea} />
                    {errors.caption && <p className={Poststyles.error}>{errors.caption}</p>}
                </div>
                {errors.general && <p className={Poststyles.error}>{errors.general}</p>}
                <Button className={Buttonstyles.create} type="submit" disabled={loading}>Create Post</Button>
                {loading && <p>Loading...</p>}
            </Form>
        </Container>
    );
};

export default CreatePost;