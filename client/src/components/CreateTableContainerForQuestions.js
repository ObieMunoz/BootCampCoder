import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { CreateTableForQuestions } from './CreateTableForQuestions';

export function CreateTableContainerForQuestions(rows, openComment) {
    return <TableContainer component={Paper}>
        {CreateTableForQuestions(rows, openComment)}
    </TableContainer>;
}

