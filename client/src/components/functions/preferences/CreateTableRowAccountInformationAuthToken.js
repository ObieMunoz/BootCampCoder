import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableRowAccountInformationAuthToken(token) {
    return <TableRow>
        <StyledTableCell align="center">
            Auth Token
        </StyledTableCell>
        <StyledTableCell align="center">
            {token}
        </StyledTableCell>
    </TableRow>;
}
