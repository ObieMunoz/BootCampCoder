import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "./StyledTableCell";

export function AddTableRowGitHubActivePagesDeploymentCount(gitData, gitRepoList) {
    return gitData.login ? <TableRow>
        <StyledTableCell align="center">
            Active GitHub Pages Deployments
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitRepoList.length}
        </StyledTableCell>
    </TableRow> : null;
}
