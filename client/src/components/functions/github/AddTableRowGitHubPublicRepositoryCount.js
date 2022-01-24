import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubPublicRepositoryCount(gitData) {
    return gitData.public_repos ? <TableRow>
        <StyledTableCell align="center">
            Public Repositories
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.public_repos}
        </StyledTableCell>
    </TableRow> : null;
}
