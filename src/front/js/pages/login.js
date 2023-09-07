import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = () => {
        // Here, you'd typically send 'email' and 'password' to the backend to validate
        // If validation is successful, you can redirect to the Validation page
        // For demonstration, we'll skip the backend validation step

        history.push('/validation');
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
