import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext"; // Import the context
import axios from 'axios'; // Import Axios library to make HTTP requests

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        //--> Start by constructing the payload
        const payload = {
            email: email,
            password: password
        };

        //--> Sending the login request to the backend
        axios.post(process.env.BACKEND_URL+`api/login`, payload)
            .then(response => {
                //--> If login is successful, move to the Validation page
                if(response.status === 200) {
                    navigate('/validation');
                }
            })
            .catch(error => {
                //--> Handle errors (Optional)
                console.error("There was an error logging in:", error);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
