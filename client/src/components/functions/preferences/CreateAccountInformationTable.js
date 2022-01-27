import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { CreateTableHeadersAccountInformation } from './CreateTableHeadersAccountInformation';
import { CreateTableBodyAccountInformation } from './CreateTableBodyAccountInformation';

export function CreateAccountInformationTable(bearer, editMode, newGitHubUsername, setNewGitHubUsername, token) {
    return <TableContainer component={Paper}>
        <Table aria-label="customized table">
            {CreateTableHeadersAccountInformation()}
            {CreateTableBodyAccountInformation(bearer, editMode, newGitHubUsername, setNewGitHubUsername, token)}
        </Table>
    </TableContainer>;
}


