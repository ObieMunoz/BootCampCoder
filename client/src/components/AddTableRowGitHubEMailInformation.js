import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "./StyledTableCell";

export function AddTableRowGitHubEMailInformation(gitData) {
    return gitData.email ? <TableRow>
        <StyledTableCell align="center">
            E-Mail Address
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.email}
        </StyledTableCell>
    </TableRow> : null;
}
