import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "./StyledTableCell";

export function AddTableRowGitHubLinkedTwitter(gitData) {
    return gitData.twitter_username ? <TableRow>
        <StyledTableCell align="center">
            Twitter Username
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.twitter_username}
        </StyledTableCell>
    </TableRow> : null;
}
