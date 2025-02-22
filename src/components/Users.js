import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token properly
            if (!token) {
                setError("No authentication token found. Please log in.");
                return;
            }

            const res = await axios.get("/api/users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Ensure correct format
                },
            });

            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Unauthorized access");
        }
    };

    fetchUsers();
}, []);


    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default Users;
