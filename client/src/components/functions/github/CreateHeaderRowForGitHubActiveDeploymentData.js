import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function CreateHeaderRowForGitHubActiveDeploymentData() {
    return RenderTableHeaders();

    function RenderTableHeaders() {
        return <TableHead>
            <TableRow>
                <StyledTableCell align="center">REPOSITORY NAME</StyledTableCell>
                <StyledTableCell align="center">DEPLOYMENT LINK</StyledTableCell>
            </TableRow>
        </TableHead>;
    }
}
