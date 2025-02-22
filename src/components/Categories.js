import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await axios.get('http://localhost:5000/api/categories/category');
        setCategories(res.data);
    };

    const handleSave = async () => {
        if (editCategory) {
            await axios.put(`http://localhost:5000/api/categories/${editCategory._id}`, { name: categoryName });
        } else {
            await axios.post('http://localhost:5000/api/categories/categories', { name: categoryName });
        }
        setShowModal(false);
        setCategoryName('');
        setEditCategory(null);
        fetchCategories();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api//api/categories${id}`);
        fetchCategories();
    };

    return (
        <div className="container mt-4">
            <h2>Categories</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Category</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button 
                                    variant="warning" 
                                    onClick={() => { setEditCategory(category); setCategoryName(category.name); setShowModal(true); }}>
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    className="ms-2"
                                    onClick={() => handleDelete(category._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Category */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editCategory ? 'Edit' : 'Add'} Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={categoryName} 
                                onChange={(e) => setCategoryName(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Categories;
