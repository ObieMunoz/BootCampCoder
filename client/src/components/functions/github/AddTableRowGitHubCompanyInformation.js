import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubCompanyInformation(gitData) {
    return gitData.company ? CreateTRCompany() : null;

    function CreateTRCompany() {
        return <TableRow>
            <StyledTableCell align="center">
                Company
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.company}
            </StyledTableCell>
        </TableRow>;
    }
}
