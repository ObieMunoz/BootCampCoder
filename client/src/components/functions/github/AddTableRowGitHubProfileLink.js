import React from 'react';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from "../styles/StyledTableCell";

export function AddTableRowGitHubProfileLink(gitData) {
    return gitData.html_url ? CreateTRGitHubLink() : null;

    function CreateTRGitHubLink() {
        return <TableRow>
            <StyledTableCell align="center">
                GitHub Link
            </StyledTableCell>
            <StyledTableCell align="center">
                <a href={gitData.html_url} target="_blank" rel="noreferrer">{gitData.html_url}</a>
            </StyledTableCell>
        </TableRow>;
    }
}
