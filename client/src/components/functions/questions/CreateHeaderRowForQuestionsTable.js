import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from '../styles/StyledTableCell';
import useMediaQuery from '@mui/material/useMediaQuery';

export function CreateHeaderRowForQuestionsTable() {

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return <TableHead>
        <TableRow>
            <StyledTableCell>QUESTION</StyledTableCell>
            {isSmallScreen ? null : <>
                <StyledTableCell align="right">REPLIES</StyledTableCell>
                <StyledTableCell align="right">AUTHOR</StyledTableCell>
                <StyledTableCell align="right">LAST UPDATED</StyledTableCell>
            </>
            }
        </TableRow>
    </TableHead>;
}
