import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubLocationInformation(gitData) {
    return gitData.location ? CreateTRLocation() : null;

    function CreateTRLocation() {
        return <TableRow>
            <StyledTableCell align="center">
                Location
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.location}
            </StyledTableCell>
        </TableRow>;
    }
}
