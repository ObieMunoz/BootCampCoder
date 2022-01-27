import React from 'react';
import TableRow from '@mui/material/TableRow';
import { CreateTableCellAndCleanRepositoryName } from './CreateTableCellAndCleanRepositoryName';
import { CreateTableCellAndGenerateRepositoryURL } from './CreateTableCellAndGenerateRepositoryURL';

export function AddTableRowForDeployment(repo, github_username) {
    return RenderTableRow();

    function RenderTableRow() {
        return <TableRow key={repo.id}>
            {CreateTableCellAndCleanRepositoryName(repo)}
            {CreateTableCellAndGenerateRepositoryURL(github_username, repo)}
        </TableRow>;
    }
}
