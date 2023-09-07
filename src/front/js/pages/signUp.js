import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    //>> Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //>> Create a payload object
        const payload = {
            email: email,
            password: password
        };

        //>> Sending POST request to Flask API to create a new user
        const response = await fetch(process.env.BACKEND_URL+'/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        //>> Parsing the response from the server
        const data = await response.json();

        if (response.status === 201) {
            //>> User creation successful, redirect to login page
            history.push('/login');
        } else {
            //>> Show error message
            alert(data.message);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};
