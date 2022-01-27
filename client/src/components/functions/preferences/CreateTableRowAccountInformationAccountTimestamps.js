import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableRowAccountInformationAccountTimestamps(bearer) {
    return <>
        <TableRow>
            <StyledTableCell align="center">
                Account Created
            </StyledTableCell>
            <StyledTableCell align="center">
                {new Date(bearer.created_at).toLocaleString()}
            </StyledTableCell>
        </TableRow>
        <TableRow>
            <StyledTableCell align="center">
                Account Updated
            </StyledTableCell>
            <StyledTableCell align="center">
                {new Date(bearer.updated_at).toLocaleString()}
            </StyledTableCell>
        </TableRow>
    </>;
}
