import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableRowAccountInformationEMail(bearer) {
    return RenderTableRowWithEMailAddress();

    function RenderTableRowWithEMailAddress() {
        return <TableRow>
            <StyledTableCell align="center">
                E-Mail Address
            </StyledTableCell>
            <StyledTableCell align="center">
                {bearer.email}
            </StyledTableCell>
        </TableRow>;
    }
}
