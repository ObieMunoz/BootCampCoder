import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableHeadersAccountInformation() {
    return RenderTableHeaders();

    function RenderTableHeaders() {
        return <TableHead>
            {CreateTableRowAccountInformation()}
        </TableHead>;
    }

    function CreateTableRowAccountInformation() {
        return <TableRow>
            <StyledTableCell align="center">ACCOUNT INFORMATION</StyledTableCell>
            <StyledTableCell align="center">USER PROFILE</StyledTableCell>
        </TableRow>;
    }
}
