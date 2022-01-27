import React from 'react';
import Table from '@mui/material/Table';
import { CreateHeaderRowForGitHubActiveDeploymentData } from './CreateHeaderRowForGitHubActiveDeploymentData';
import { CreateBodyForGitHubActiveDeploymentData } from './CreateBodyForGitHubActiveDeploymentData';

export function CreateTableForGitHubActiveDeploymentData(gitRepoList, github_username) {
    return RenderTableGitHubData();

    function RenderTableGitHubData() {
        return <Table aria-label="customized table">
            {CreateHeaderRowForGitHubActiveDeploymentData()}
            {CreateBodyForGitHubActiveDeploymentData(gitRepoList, github_username)}
        </Table>;
    }
}
