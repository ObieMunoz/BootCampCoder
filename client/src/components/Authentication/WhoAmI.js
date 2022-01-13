import React, { useState, useEffect } from 'react'

function WhoAmI({ token }) {
    const [user, setUser] = useState("User");
    const [github, setGithub] = useState("Unlinked GitHub Account");
    const [lastUpdate, setLastUpdate] = useState("Never");

    useEffect(() => {
        fetch('http://localhost:3000/api-keys', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        })
            .then(response => response.json())
            .then(data => {
                setUser(data[0]['bearer']['email'])
                setGithub("Unlinked GitHub Account" || data[0]['bearer']['github_username'])
                setLastUpdate(data[0]['bearer']['updated_at'])
            })
    }, [])

    return (
        <>
            <h2>Who Am I?</h2>
            <p>E-Mail: {user}</p>
            <p>Github Account: {github}</p>
            <p>Last Update: {lastUpdate}</p>
            <p>Auth Token: {token ? JSON.stringify(token) : ''}</p>
        </>
    )
}

export default WhoAmI
