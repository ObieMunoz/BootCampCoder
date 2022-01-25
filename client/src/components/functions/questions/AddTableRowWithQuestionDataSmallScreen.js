import * as React from 'react';
import { StyledTableCell } from '../styles/StyledTableCell';
import { StyledTableRow } from '../styles/StyledTableRow';

export function AddTableRowWithQuestionDataSmallScreen(row, openComment) {
    return <StyledTableRow key={row.question_id} onClick={() => openComment(row.question_id)} style={{ cursor: 'pointer' }} className="question-table-row">
        <StyledTableCell component="th" scope="row">
            {row.question}
        </StyledTableCell>
    </StyledTableRow>;
}
