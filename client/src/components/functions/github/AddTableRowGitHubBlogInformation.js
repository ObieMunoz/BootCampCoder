import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

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
