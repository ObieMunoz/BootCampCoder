import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableRowAccountInformationAccountTimestamps(bearer) {
    return RenderTableRowsWithAccountTimestamps();

    function RenderTableRowsWithAccountTimestamps() {
        return <>
            {CreateTableRowAccountCreatedDate()}
            {CreateTableRowAccountUpdatedDate()}
        </>;
    }

    function CreateTableRowAccountUpdatedDate() {
        return <TableRow>
            <StyledTableCell align="center">
                Account Updated
            </StyledTableCell>
            <StyledTableCell align="center">
                {new Date(bearer.updated_at).toLocaleString()}
            </StyledTableCell>
        </TableRow>;
    }

    function CreateTableRowAccountCreatedDate() {
        return <TableRow>
            <StyledTableCell align="center">
                Account Created
            </StyledTableCell>
            <StyledTableCell align="center">
                {new Date(bearer.created_at).toLocaleString()}
            </StyledTableCell>
        </TableRow>;
    }
}
