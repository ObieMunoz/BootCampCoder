import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function CreateHeaderRowForGitHubTable(gitData) {
    return <TableHead>
        <TableRow>
            <StyledTableCell align="center">GITHUB ACCOUNT:</StyledTableCell>
            <StyledTableCell align="center">{gitData.login || "NO ACCOUNT LINKED"}</StyledTableCell>
        </TableRow>
    </TableHead>;
}
