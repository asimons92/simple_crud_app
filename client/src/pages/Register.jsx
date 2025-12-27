import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Register({ setShowRegister }) {
    const [editEmail, setEditEmail] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editRePassword, setEditRePassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // set error like Login.jsx? Look into this
        
        setError('');

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
            const response = await api.post('/auth/register',new_user)
            const credentials = {
                email: editEmail,
                password: editPassword, 
            }
            try {
                const response = await api.post('/auth/login', credentials);
                
                if (response.data.token) {
                    login(response.data.token); // This updates the global state and localStorage!
                }
            } catch (err) {
                setError(err.response?.data?.error || 'Login failed. Please try again.');
                console.error('Login error:', err);
            }


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
                
                <input
                    type="password"
                    value={editRePassword}
                    placeholder='Retype Password'
                    onChange={(e) => setEditRePassword(e.target.value)} 
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Register</button>
            </form>
            <button type="button" onClick={() => setShowRegister(false)}>Back to Login</button>
        </div>
    )
}