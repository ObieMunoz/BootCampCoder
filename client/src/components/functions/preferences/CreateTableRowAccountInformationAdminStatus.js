import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableRowAccountInformationAdminStatus(bearer) {
    return RenderTableRowAccountInformationAdminStatus();

    function RenderTableRowAccountInformationAdminStatus() {
        return <TableRow>
            <StyledTableCell align="center">
                Admin
            </StyledTableCell>
            <StyledTableCell align="center">
                {DisplayTextBasedOnAdminStatus()}
            </StyledTableCell>
        </TableRow>;
    }

    function DisplayTextBasedOnAdminStatus() {
        return bearer.admin ? "Full Access" : "No Admin Privileges";
    }
}