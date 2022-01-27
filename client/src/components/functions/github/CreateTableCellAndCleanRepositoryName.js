import React from 'react';
import { StyledTableCell } from "../styles/StyledTableCell";

export function CreateTableCellAndCleanRepositoryName(repo) {
    return <StyledTableCell align="center">
        {repo.name.split(/-|_|./).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </StyledTableCell>;
}
