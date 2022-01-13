import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Registration.css';

async function registerUser(credentials) {
    console.log(credentials)
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
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [github, setGithub] = useState();
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
            <form onSubmit={handleSubmit}>
                <label>
                    <p>E-Mail Address</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} required />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} required />
                </label>
                <label>
                    <p>GitHub Username</p>
                    <input type="text" onChange={e => setGithub(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
                {errors.map(error => <p key={error}>{error}</p>)}
            </form>
        </div>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
};