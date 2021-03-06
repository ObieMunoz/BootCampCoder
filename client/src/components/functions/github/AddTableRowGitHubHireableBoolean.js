import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubHireableBoolean(gitData) {
    return gitData.hireable ? CreateTRHireable() : null;

    function CreateTRHireable() {
        return <TableRow>
            <StyledTableCell align="center">
                Hireable
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.hireable ? 'Yes' : 'No'}
            </StyledTableCell>
        </TableRow>;
    }
}
