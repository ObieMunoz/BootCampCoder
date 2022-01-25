import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { CreateTableForQuestions } from './CreateTableForQuestions';

export function CreateTableContainerForQuestions(rows, openComment) {
    return <TableContainer component={Paper} style={{ maxWidth: '90vw', display: 'flex', margin: '0 auto' }}>
        {CreateTableForQuestions(rows, openComment)}
    </TableContainer>;
}

