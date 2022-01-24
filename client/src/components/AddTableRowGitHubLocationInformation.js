import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "./StyledTableCell";

export function AddTableRowGitHubLocationInformation(gitData) {
    return gitData.location ? <TableRow>
        <StyledTableCell align="center">
            Location
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.location}
        </StyledTableCell>
    </TableRow> : null;
}
