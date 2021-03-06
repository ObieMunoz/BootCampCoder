import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubFollowersCount(gitData) {
    return gitData.followers ? CreateTRFollowers() : null;

    function CreateTRFollowers() {
        return <TableRow>
            <StyledTableCell align="center">
                Followers
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.followers}
            </StyledTableCell>
        </TableRow>;
    }
}
