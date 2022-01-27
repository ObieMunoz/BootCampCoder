import React from 'react';
import { StyledTableCell } from "../styles/StyledTableCell";

export function CreateTableCellAndCleanRepositoryName(repo) {
    return RenderRepositoryRow();

    function RenderRepositoryRow() {
        return <StyledTableCell align="center">
            {CleanRepositoryName()}
        </StyledTableCell>;
    }

    function CleanRepositoryName() {
        return repo.name.split(/-|_/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}