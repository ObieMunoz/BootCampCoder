import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubLinkedTwitter(gitData) {
    return gitData.twitter_username ? CreateTRTwitterUsername() : null;

    function CreateTRTwitterUsername() {
        return <TableRow>
            <StyledTableCell align="center">
                Twitter Username
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.twitter_username}
            </StyledTableCell>
        </TableRow>;
    }
}
