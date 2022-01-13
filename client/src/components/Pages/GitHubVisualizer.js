import React, { useState, useEffect } from 'react'
import useToken from '../App/useToken'

function GitHubVisualizer() {
    const { bearer } = useToken()
    const github_username = bearer.github_username
    const [gitData, setGitData] = useState([])
    const [gitRepos, setGitRepos] = useState([])


    useEffect(() => {
        if (github_username) {
            fetch(`https://api.github.com/users/${github_username}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setGitData(data)
                })
        }
    }, [])

    useEffect(() => {
        if (gitData) {
            for (let i = 1; i <= Math.ceil(gitData.public_repos / 100); i += 1) {
                fetch(`https://api.github.com/users/${github_username}/repos?page=${i}&per_page=100`)
                    .then(response => response.json())
                    .then(data => {
                        setGitRepos(prevState => [...prevState, ...data])
                    })
            }
        }
    }, [gitData])

    console.log(gitRepos)
    const gitRepoList = gitRepos.filter(repo => repo.has_pages === true)

    return (
        <>
            <h2>GitHub Visualizer</h2>
            <img src={gitData.avatar_url} alt="GitHub Avatar" width="250px" />
            <p>Name: {gitData.name}</p>
            <p>Number of Repositories: {gitData.public_repos}</p>
            <p>Number of Followers: {gitData.followers}</p>
            <p>Number of Following: {gitData.following}</p>
            <p>Github URL: {gitData.html_url}</p>
            {/* <p>{JSON.stringify(gitData)}</p> */}
            {gitRepoList.map(repo => (
                <div key={repo.id}>
                    <p>Repo Name: {repo.name}</p>
                    <a href={`https://${github_username}.github.io/${repo.name}`} target="_blank" rel="noreferrer">{repo.name}</a>
                </div>
            ))}
        </>
    )
}

export default GitHubVisualizer
