import React from 'react';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { StyledTableCell } from '../styles/StyledTableCell';

export function CreateTableRowAccountInformationGitHubEditable(editMode, newGitHubUsername, setNewGitHubUsername, bearer) {
    return <TableRow>
        <StyledTableCell align="center">
            Github Account
        </StyledTableCell>
        <StyledTableCell align="center">
            {editMode
                ? <>
                    <TextField id="outlined-basic" label="GitHub Username" variant="outlined" value={newGitHubUsername} onChange={(e) => setNewGitHubUsername(e.target.value)} />
                </>
                : bearer.github_username || "No Account Listed"}
        </StyledTableCell>
    </TableRow>;
}
