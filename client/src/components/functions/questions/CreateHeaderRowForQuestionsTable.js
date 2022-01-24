import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateHeaderRowForQuestionsTable() {
    return <TableHead>
        <TableRow>
            <StyledTableCell>QUESTION</StyledTableCell>
            <StyledTableCell align="right">REPLIES</StyledTableCell>
            <StyledTableCell align="right">AUTHOR</StyledTableCell>
            <StyledTableCell align="right">LAST UPDATED</StyledTableCell>
        </TableRow>
    </TableHead>;
}
