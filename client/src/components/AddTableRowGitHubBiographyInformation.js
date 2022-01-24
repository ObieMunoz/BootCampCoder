import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "./StyledTableCell";

export function AddTableRowGitHubBiographyInformation(gitData) {
    return gitData.bio ? <TableRow>
        <StyledTableCell align="center">
            Bio
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.bio}
        </StyledTableCell>
    </TableRow> : null;
}
