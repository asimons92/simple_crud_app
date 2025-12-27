import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
    const [editEmail, setEditEmail] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editRePassword, setEditRePassword] = useState('');


    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // set error like Login.jsx? Look into this

        if (editPassword !== editRePassword) {
            setError("Passwords do not match!");
            return; // Stop the function here
        }
        
        const new_user = {
            email: editEmail,
            username: editUsername,
            password: editPassword,
            role: 'employee'
        }
        try {
            const response = await api.post('/users/register',new_user)
            // log them in automatically
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    }

    return(
        <div className="registration-div">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={editEmail}
                    placeholder='Email'
                    onChange={(e) => setEditEmail(e.target.value)} 
                />
                <input
                    type="text"
                    value={editUsername}
                    placeholder='Username'
                    onChange={(e) => setEditUsername(e.target.value)} 
                />
                <input
                    type="password"
                    value={editPassword}
                    placeholder='Password'
                    onChange={(e) => setEditPassword(e.target.value)} 
                />
                {/* TODO: Logic for checking if these passwords match */}
                <input
                    type="password"
                    value={editRePassword}
                    placeholder='Retype Password'
                    onChange={(e) => setEditRePassword(e.target.value)} 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}