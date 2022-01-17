import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import Alert from '@mui/material/Alert';
const API = 'https://bootcampcoder.herokuapp.com/'

async function loginUser(credentials) {
    return fetch(API + 'api-keys', {
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
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (errors) {
            setDisabled(() => true)
            setTimeout(() => {
                setErrors();
            }, 3000);
            return () => {
                setDisabled(() => false)
            }
        }
    }, [errors])

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email: username,
            password: password
        });
        // setToken(token);
        if (token.errors) {
            setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{token.errors}</Alert>)
            console.log(token.errors)
        } else {
            setToken(token);
            console.log(token)
        }
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
                    required
                /><br /><br />
                <TextField
                    id="login-password-field"
                    label="Password"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <br /><br />
                <Button variant="contained" color="primary" type="submit" size="large" disabled={disabled}>Log In</Button>
                <br /><br />
                {errors}
            </Box>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};