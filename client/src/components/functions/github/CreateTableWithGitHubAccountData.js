import React from 'react';
import Table from '@mui/material/Table';
import { CreateHeaderRowForGitHubTable } from './CreateHeaderRowForGitHubTable';
import { CreateBodyForGitHubTable } from './CreateBodyForGitHubTable';

export function CreateTableWithGitHubAccountData(gitData, gitRepoList) {
    return RenderTableGHData();

    function RenderTableGHData() {
        return <Table aria-label="github-account-data-table">
            {CreateHeaderRowForGitHubTable(gitData)}
            {CreateBodyForGitHubTable(gitData, gitRepoList)}
        </Table>;
    }
}


