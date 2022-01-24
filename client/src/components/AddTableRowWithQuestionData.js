import * as React from 'react';
import { StyledTableCell } from './StyledTableCell';
import { StyledTableRow } from './StyledTableRow';

export function AddTableRowWithQuestionData(row, openComment) {
    return <StyledTableRow key={row.question_id} onClick={() => openComment(row.question_id)} style={{ cursor: 'pointer' }} className="question-table-row">
        <StyledTableCell component="th" scope="row">
            {row.question}
        </StyledTableCell>
        <StyledTableCell align="right">{row.comments_count}</StyledTableCell>
        <StyledTableCell align="right">{row.author}</StyledTableCell>
        <StyledTableCell align="right">{new Date(row.updated_at).toLocaleString()}</StyledTableCell>
    </StyledTableRow>;
}
