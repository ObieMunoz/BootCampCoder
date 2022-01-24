import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { AddTableRowWithQuestionData } from './AddTableRowWithQuestionData';

export function CreateBodyForQuestionsTable(rows, openComment) {
    return <TableBody>
        {rows.map((row) => (
            AddTableRowWithQuestionData(row, openComment)
        ))}
    </TableBody>;
}