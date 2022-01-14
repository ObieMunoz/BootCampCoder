import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"

async function loginUser(credentials) {
    return fetch('http://localhost:3000/api-keys', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Basic ' + btoa(credentials.email + ":" + credentials.password),
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email: username,
            password: password
        });
        setToken(token);
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="login-username-field"
                    label="E-Mail Address"
                    value={username}
                    type="text"
                    onChange={e => setUserName(e.target.value)}
                /><br /><br />
                <TextField
                    id="login-password-field"
                    label="Password"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <br /><br />
                <Button variant="contained" color="primary" type="submit" size="large">Log In</Button>
            </Box>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};