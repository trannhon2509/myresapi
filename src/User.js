import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ id: '', name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://revibeco.runasp.net/api/Users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://revibeco.runasp.net/api/Users', formData);
            setUsers([...users, response.data]);
            setFormData({ id: '', name: '', email: '' });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditUser = (user) => {
        setFormData(user);
        setIsEditing(true);
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://revibeco.runasp.net/api/Users/${formData.id}`, formData);
            fetchUsers();
            setFormData({ id: '', name: '', email: '' });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://revibeco.runasp.net/api/Users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h1>Users</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {isEditing ? (
                    <button onClick={handleUpdateUser}>Update User</button>
                ) : (
                    <button onClick={handleAddUser}>Add User</button>
                )}
            </div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default User;
