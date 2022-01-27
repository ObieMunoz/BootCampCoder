import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubFollowingCount(gitData) {
    return gitData.following ? CreateTRFollowing() : null;

    function CreateTRFollowing() {
        return <TableRow>
            <StyledTableCell align="center">
                Following
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.following}
            </StyledTableCell>
        </TableRow>;
    }
}
