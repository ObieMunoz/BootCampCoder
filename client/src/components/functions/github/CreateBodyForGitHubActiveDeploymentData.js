import React from 'react';
import TableBody from '@mui/material/TableBody';
import { AddTableRowForDeployment } from './AddTableRowForDeployment';

export function CreateBodyForGitHubActiveDeploymentData(gitRepoList, github_username) {
    return CreateTableBody();

    function CreateTableBody() {
        return <TableBody>
            {gitRepoList.map(repo => (
                AddTableRowForDeployment(repo, github_username)
            ))}
        </TableBody>;
    }
}
