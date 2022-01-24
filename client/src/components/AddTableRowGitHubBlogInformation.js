import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "./StyledTableCell";

export function AddTableRowGitHubBlogInformation(gitData) {
    return gitData.blog ? <TableRow>
        <StyledTableCell align="center">
            Blog
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.blog}
        </StyledTableCell>
    </TableRow> : null;
}
