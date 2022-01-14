import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function QuestionTable({ questions }) {

    function createData(question_id, question, comments_count, author, updated_at) {
        return { question_id, question, comments_count, author, updated_at };
    }
    console.log(questions)
    const rows = questions?.map(question => {
        return createData(question.id, question.title, question.comments_count, question.author, question.updated_at);
    })

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>QUESTION</StyledTableCell>
                        <StyledTableCell align="right">REPLIES</StyledTableCell>
                        <StyledTableCell align="right">AUTHOR</StyledTableCell>
                        <StyledTableCell align="right">LAST UPDATED</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.question_id}>
                            <StyledTableCell component="th" scope="row">
                                <Link to={`/questions/${row.question_id}`} style={{ textDecoration: "none", color: "black" }}>
                                    {row.question}
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.comments_count}</StyledTableCell>
                            <StyledTableCell align="right">{row.author}</StyledTableCell>
                            <StyledTableCell align="right">{row.updated_at}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
