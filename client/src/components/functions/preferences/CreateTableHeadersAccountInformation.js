import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableHeadersAccountInformation() {
    return <TableHead>
        <TableRow>
            <StyledTableCell align="center">ACCOUNT INFORMATION</StyledTableCell>
            <StyledTableCell align="center">USER PROFILE</StyledTableCell>
        </TableRow>
    </TableHead>;
}
