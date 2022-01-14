import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Registration.css';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"

async function registerUser(credentials) {
    return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Registration({ setToken }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [github, setGithub] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        // console.log(errors)
    }, [errors])

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await registerUser({
            user: {
                email: username,
                password: password,
                github_username: github
            }
        })
        if (token.errors) {
            setErrors(token.errors)
            console.log(token.errors)
        } else {
            setToken(token);
            console.log(token)
        }
    }

    return (
        <div className="registration-wrapper">
            <h1>Register New User</h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="registration-username-field"
                    label="E-Mail Address"
                    value={username}
                    type="text"
                    onChange={e => setUserName(e.target.value)}
                /><br /><br />
                <TextField
                    id="registration-password-field"
                    label="Password"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                /><br /><br />
                <TextField
                    id="registration-github-field"
                    label="GitHub Username"
                    value={github}
                    type="text"
                    onChange={e => setGithub(e.target.value)}
                />
                <br /><br />
                <Button variant="contained" color="primary" type="submit" size="large">sign up</Button>
            </Box>
        </div>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
};