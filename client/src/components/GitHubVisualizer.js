import React, { useState, useEffect } from 'react'
import useToken from './useToken'
import { CreateTableContainerWithGitHubAccountData } from './CreateTableContainerWithGitHubAccountData';
import { CreateTableContainerWithGitHubActiveDeploymentData } from './CreateTableContainerWithGitHubActiveDeploymentData';
import { FetchGitHubUserData } from './FetchGitHubUserData';
import { FetchGitHubRepositoryDataForUser } from './FetchGitHubRepositoryDataForUser';

function GitHubVisualizer() {
    const { bearer } = useToken()
    const github_username = bearer.github_username
    const [gitData, setGitData] = useState([])
    const [gitRepos, setGitRepos] = useState([])


    useEffect(() => {
        if (github_username) {
            FetchGitHubUserData(github_username, setGitData);
        }
    }, [])

    useEffect(() => {
        if (gitData) {
            for (let i = 1; i <= Math.ceil(gitData.public_repos / 100); i += 1) {
                if (i <= 6) {
                    FetchGitHubRepositoryDataForUser(github_username, i, setGitRepos);
                } else {
                    console.log('Due to API rate limitations, only the first 500 repositories are scanned.')
                    break
                }
            }
        }
    }, [gitData])

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



