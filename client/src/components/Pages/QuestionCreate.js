import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"

function QuestionCreate() {
    return (
        <div>
            <h1>QuestionCreate</h1>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="new-question-title-field"
                    label="Question Title"
                    type="text"
                    fullWidth
                    required
                /><br /><br />
                <TextField
                    id="outlined-textarea"
                    label="Description"
                    multiline
                    fullWidth
                    rows={6}
                    required
                />
                <br /><br />
                <Button variant="contained" color="primary" type="submit" size="large">Post Question</Button>
                &nbsp;&nbsp;
                <Button variant="contained" color="primary" size="large">Go back</Button>
            </Box>
        </div>
    )
}

export default QuestionCreate
