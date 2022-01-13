import React, { useEffect } from 'react'

function GitHubVisualizer(user) {
    useEffect(() => {
        fetch(`https://api.github.com/users/${user}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }, [user])

    return (
        <h2>GitHub Visualizer</h2>
    )
}

export default GitHubVisualizer
