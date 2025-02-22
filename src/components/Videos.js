import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [videoData, setVideoData] = useState({ title: '', description: '', category: '', videourl: '', thumbnail: '' });
    const [editVideo, setEditVideo] = useState(null);

    useEffect(() => {
        fetchVideos();
        fetchCategories();
    }, []);

    const fetchVideos = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:5000/api/videos/videos',{
            headers: {
                Authorization: `Bearer ${token}`, // Attach token
            }
            });
        setVideos(res.data);
    };

    const fetchCategories = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:5000/api/categories/category',{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setCategories(res.data);
    };

    const handleSave = async () => {
         const token = localStorage.getItem("token");
        if (editVideo) {
            await axios.put(`http://localhost:5000/api/videos/videos/${editVideo._id}`, videoData,{
                 headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else {
            await axios.post('http://localhost:5000/api/videos/', videoData,{
                 headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        setShowModal(false);
        setVideoData({ title: '', description: '', category: '', videourl: '', thumbnail: '' });
        setEditVideo(null);
        fetchVideos();
    };
    
    

    const handleDelete = async (id) => {
         const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/videos/videos/${id}`,{
             
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchVideos();
    };
    

    return (
        <div className="container mt-4">
            <h2>Videos</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Video</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video, index) => (
                        <tr key={video._id}>
                            <td>{index + 1}</td>
                            <td>{video.title}</td>
                            <td>{video.category?.name || 'No Category'}</td>
                            <td>
                               <Button 
                        variant="warning" 
                        onClick={() => {
                            setEditVideo(video);// Set the selected video for editing
                            setVideoData({
                                title: video.title,
                                description: video.description,
                                category: video.category?._id || '',  // Ensure category _id is selected
                                videourl: video.videourl,
                                thumbnail: video.thumbnail
                            });
                            setShowModal(true); // Open the modal
                        }}>
                        Edit
                    </Button>
                
                                <Button 
                                    variant="danger" 
                                    className="ms-2"
                                    onClick={() => handleDelete(video._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Video */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editVideo ? 'Edit' : 'Add'} Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={videoData.title} 
                                onChange={(e) => setVideoData({ ...videoData, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={videoData.description} 
                                onChange={(e) => setVideoData({ ...videoData, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                value={videoData.category} 
                                onChange={(e) => setVideoData({ ...videoData, category: e.target.value })}/>
                                value={videoData.videoCateory}
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Video URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={videoData.videourl} 
                                onChange={(e) => setVideoData({ ...videoData, videourl: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Thumbnail URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={videoData.thumbnail} 
                                onChange={(e) => setVideoData({ ...videoData, thumbnail: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Videos;
