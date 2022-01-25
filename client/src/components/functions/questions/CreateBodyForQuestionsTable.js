import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { AddTableRowWithQuestionData } from './AddTableRowWithQuestionData';
import { AddTableRowWithQuestionDataSmallScreen } from './AddTableRowWithQuestionDataSmallScreen';
import useMediaQuery from '@mui/material/useMediaQuery';

export function CreateBodyForQuestionsTable(rows, openComment) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return <TableBody>
        {isSmallScreen ? rows.map((row) => (
            AddTableRowWithQuestionDataSmallScreen(row, openComment)
        )) : rows.map((row) => (
            AddTableRowWithQuestionData(row, openComment)
        ))}
    </TableBody>;
}