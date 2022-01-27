import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubActivePagesDeploymentCount(gitData, gitRepoList) {
    return gitData.login ? RenderTRActiveDeployment() : null;

    function RenderTRActiveDeployment() {
        return <TableRow>
            <StyledTableCell align="center">
                Active GitHub Pages Deployments
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitRepoList.length}
            </StyledTableCell>
        </TableRow>;
    }
}
