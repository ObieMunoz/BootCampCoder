import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { CreateTableForQuestions } from './CreateTableForQuestions';

export function CreateTableContainerForQuestions(rows, openComment) {
    return <TableContainer component={Paper} style={{ maxWidth: '90vw' }}>
        {CreateTableForQuestions(rows, openComment)}
    </TableContainer>;
}

