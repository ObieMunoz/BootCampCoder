import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

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
