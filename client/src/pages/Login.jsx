import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [editEmail,setEditEmail] = useState('');
    const [editPassword,setEditPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const credentials = {
            email: editEmail,
            password: editPassword,      
        };

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
            
            if (response.data.token) {
                login(response.data.token); // This updates the global state and localStorage!
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
            console.error('Login error:', err);
        }
    }

    return(
        <div className="login-div">
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={editEmail} 
                    placeholder='Email'
                    onChange={(e) => setEditEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    value={editPassword} 
                    placeholder='Password'
                    onChange={(e) => setEditPassword(e.target.value)} 
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}