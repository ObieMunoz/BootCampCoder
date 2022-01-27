import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { CreateTableWithGitHubAccountData } from './CreateTableWithGitHubAccountData';

export function CreateTableContainerWithGitHubAccountData(gitData, gitRepoList) {
    return RenderTableContainerWithGHAccountData();

    function RenderTableContainerWithGHAccountData() {
        return <TableContainer component={Paper}>
            {CreateTableWithGitHubAccountData(gitData, gitRepoList)}
        </TableContainer>;
    }
}

