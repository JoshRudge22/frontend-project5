import React, { useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button } from 'react-bootstrap';
import Poststyles from '../../styles/CreatingPost.module.css';
import Buttonstyles from '../../styles/Buttons.module.css';

const CreatePost = ({ onPostCreated }) => {
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [caption, setCaption] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [videoPreview, setVideoPreview] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setVideo(null);
            setVideoPreview('');
        }
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!caption.trim()) newErrors.caption = "Caption cannot be empty";
        if (image && video) newErrors.media = "Please upload either an image or a video, not both";
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
        if (video) formData.append('video', video);
        formData.append('caption', caption);

        try {
            const response = await axiosReq.post('/posts/', formData);
            console.log('Post created successfully:', response.data);
            onPostCreated(response.data);
            setImage(null);
            setVideo(null);
            setCaption('');
            setImagePreview('');
            setVideoPreview('');
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
        <div className={Poststyles.container}>
            <h1 className={Poststyles.title}>Create Post</h1>
            <Form className={Poststyles.form} onSubmit={handleSubmit}>
                <div>
                    <Form.Label className={Poststyles.label} htmlFor="image">Image:</Form.Label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" className={Poststyles.preview} />}
                    {errors.image && <p className={Poststyles.error}>{errors.image}</p>}
                </div>
                <div>
                    <Form.Label className={Poststyles.label} htmlFor="video">Video:</Form.Label>
                    <input type="file" id="video" accept="video/*" onChange={handleVideoChange} />
                    {videoPreview && <video src={videoPreview} controls className={Poststyles.preview} />}
                    {errors.video && <p className={Poststyles.error}>{errors.video}</p>}
                </div>
                <div>
                    <Form.Label className={Poststyles.label} htmlFor="caption">Caption:</Form.Label>
                    <textarea id="caption" value={caption} onChange={handleCaptionChange} className={Poststyles.textarea} />
                    {errors.caption && <p className={Poststyles.error}>{errors.caption}</p>}
                </div>
                {errors.media && <p className={Poststyles.error}>{errors.media}</p>}
                {errors.general && <p className={Poststyles.error}>{errors.general}</p>}
                <Button className={Buttonstyles.button} type="submit" disabled={loading}>Create Post</Button>
                {loading && <p>Loading...</p>}
            </Form>
        </div>
    );
};

export default CreatePost;