import React, { useState, useEffect } from 'react'
import useToken from './useToken'
import { CreateTableContainerWithGitHubAccountData } from './CreateTableContainerWithGitHubAccountData';
import { CreateTableContainerWithGitHubActiveDeploymentData } from './CreateTableContainerWithGitHubActiveDeploymentData';

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
                if (i <= 6) {
                    fetch(`https://api.github.com/users/${github_username}/repos?page=${i}&per_page=100`)
                        .then(response => response.json())
                        .then(data => {
                            setGitRepos(prevState => [...prevState, ...data])
                        })
                } else {
                    console.log('Due to API rate limitations, only the first 500 repositories are scanned.')
                    break
                }
            }
        }
    }, [gitData])

    console.log(gitRepos)
    const gitRepoList = gitRepos.filter(repo => repo.has_pages === true)

    return (
        <>
            <h2>GitHub Visualizer</h2>
            {CreateTableContainerWithGitHubAccountData(gitData, gitRepoList)}
            <br />
            {CreateTableContainerWithGitHubActiveDeploymentData(gitRepoList, github_username)}
        </>
    )
}

export default GitHubVisualizer