import React, { useState, useEffect } from 'react'
import useToken from './functions/useToken'
import { CreateTableContainerWithGitHubAccountData } from './functions/github/CreateTableContainerWithGitHubAccountData';
import { CreateTableContainerWithGitHubActiveDeploymentData } from './functions/github/CreateTableContainerWithGitHubActiveDeploymentData';
import { FetchGETGitHubUserData } from './functions/requests/FetchGETGitHubUserData';
import { FetchPagesOfUserRepositories } from './functions/github/FetchPagesOfUserRepositories';

function GitHubAssistant() {
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
            <h1 className="subheading">GITHUB ASSISTANT</h1>
            {CreateTableContainerWithGitHubAccountData(gitData, gitRepoList)}
            <br />
            {CreateTableContainerWithGitHubActiveDeploymentData(gitRepoList, github_username)}
        </>
    )
}

export default GitHubAssistant




