import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableRowAccountInformationAdminStatus(bearer) {
    return <TableRow>
        <StyledTableCell align="center">
            Admin
        </StyledTableCell>
        <StyledTableCell align="center">
            {bearer.admin ? "Full Access" : "No Admin Privileges"}
        </StyledTableCell>
    </TableRow>;
}
