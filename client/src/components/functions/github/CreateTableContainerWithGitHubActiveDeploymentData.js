import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { CreateTableForGitHubActiveDeploymentData } from './CreateTableForGitHubActiveDeploymentData';

export function CreateTableContainerWithGitHubActiveDeploymentData(gitRepoList, github_username) {
    return gitRepoList.length > 0 ? RenderContainerWithDHDeploymentData() : null;

    function RenderContainerWithDHDeploymentData() {
        return <TableContainer component={Paper}>
            {CreateTableForGitHubActiveDeploymentData(gitRepoList, github_username)}
        </TableContainer>;
    }
}
