import React from 'react';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubAvatarAndUsername(gitData) {
    return <TableRow>
        <StyledTableCell align="center">
            <Avatar
                alt={gitData.name}
                src={gitData.avatar_url}
                sx={{ width: 100, height: 100, margin: 'auto' }} />
        </StyledTableCell>
        <StyledTableCell align="center">
            {gitData.name || "NO NAME"}
        </StyledTableCell>
    </TableRow>;
}
