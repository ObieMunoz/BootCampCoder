import React, { useState, useEffect } from 'react'
import useToken from './functions/useToken'
import { CreateTableContainerWithGitHubAccountData } from './functions/github/CreateTableContainerWithGitHubAccountData';
import { CreateTableContainerWithGitHubActiveDeploymentData } from './functions/github/CreateTableContainerWithGitHubActiveDeploymentData';
import { FetchGETGitHubUserData } from './functions/requests/FetchGETGitHubUserData';
import { FetchPagesOfUserRepositories } from './functions/github/FetchPagesOfUserRepositories';
import githubBanner from '../assets/github.png'

function GitHubVisualizer() {
    const { bearer } = useToken()
    const github_username = bearer.github_username
    const [gitData, setGitData] = useState([])
    const [gitRepos, setGitRepos] = useState([])

    useEffect(() => {
        if (github_username) {
            FetchGETGitHubUserData(github_username, setGitData);
        }
    }, [github_username])

    FetchPagesOfUserRepositories(gitData, github_username, setGitRepos);

    const gitRepoList = gitRepos.filter(repo => repo.has_pages === true)

    return (
        <>
            {/* <h2>GitHub Visualizer</h2> */}
            <img src={githubBanner} alt="GitHub Visualizer" style={{ display: 'flex', margin: '0 auto', width: '35vw' }} />
            {CreateTableContainerWithGitHubAccountData(gitData, gitRepoList)}
            <br />
            {CreateTableContainerWithGitHubActiveDeploymentData(gitRepoList, github_username)}
        </>
    )
}

export default GitHubVisualizer




