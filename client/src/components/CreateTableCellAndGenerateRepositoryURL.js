import React from 'react';
import { StyledTableCell } from "./StyledTableCell";

export function CreateTableCellAndGenerateRepositoryURL(github_username, repo) {
    return <StyledTableCell align="center">
        <a href={`https://${github_username}.github.io/${repo.name}`} target="_blank" rel="noreferrer">{repo.name}</a>
    </StyledTableCell>;
}
