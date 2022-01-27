import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubBiographyInformation(gitData) {
    return gitData.bio ? CreateTRBio() : null;

    function CreateTRBio() {
        return <TableRow>
            <StyledTableCell align="center">
                Bio
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.bio}
            </StyledTableCell>
        </TableRow>;
    }
}
