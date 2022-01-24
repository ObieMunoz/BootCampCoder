import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export function GenerateFormQuestionCreate(handleSubmit, title, setTitle, body, setBody, history) {
    return <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
    >
        <TextField
            id="new-question-title-field"
            label="Question Title"
            type="text"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            required /><br /><br />
        <TextField
            id="outlined-textarea"
            label="Description"
            multiline
            fullWidth
            rows={6}
            value={body}
            onChange={e => setBody(e.target.value)}
            required />
        <br /><br />
        <Button variant="contained" color="primary" type="submit" size="large">Post Question</Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="primary" size="large" onClick={() => history.push("/")}>Go back</Button>
    </Box>;
}
