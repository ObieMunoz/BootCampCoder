import React from 'react';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubAvatarAndUsername(gitData) {
    return RenderTRGitHubAvatarAndUsername();

    function RenderTRGitHubAvatarAndUsername() {
        return <TableRow>
            <StyledTableCell align="center">
                {CreateAvater()}
            </StyledTableCell>
            <StyledTableCell align="center">
                {gitData.name || "NO NAME"}
            </StyledTableCell>
        </TableRow>;
    }

    function CreateAvater() {
        return <Avatar
            alt={gitData.name}
            src={gitData.avatar_url}
            sx={{ width: 100, height: 100, margin: 'auto' }} />;
    }
}
