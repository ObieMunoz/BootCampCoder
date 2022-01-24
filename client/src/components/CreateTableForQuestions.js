import * as React from 'react';
import Table from '@mui/material/Table';
import { CreateHeaderRowForQuestionsTable } from './CreateHeaderRowForQuestionsTable';
import { CreateBodyForQuestionsTable } from './CreateBodyForQuestionsTable';

export function CreateTableForQuestions(rows, openComment) {
    return <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {CreateHeaderRowForQuestionsTable()}
        {CreateBodyForQuestionsTable(rows, openComment)}
    </Table>;
}


