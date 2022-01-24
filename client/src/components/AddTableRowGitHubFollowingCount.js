import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "./StyledTableCell";

export function AddTableRowGitHubFollowingCount(gitData) {
    return gitData.following ? <TableRow>
        <StyledTableCell align="center">
            Following
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.following}
        </StyledTableCell>
    </TableRow> : null;
}
