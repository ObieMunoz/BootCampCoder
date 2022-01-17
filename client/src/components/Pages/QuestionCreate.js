import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import useToken from '../App/useToken';
import { useHistory } from 'react-router-dom';
const API = 'https://bootcampcoder.herokuapp.com/api/v1/'

function QuestionCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const history = useHistory();
    const { token } = useToken();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted")
        console.log(title)
        console.log(body)
        const res = await fetch(API + `questions`, {
            method: "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        const data = await res.json();
        res.status === 201 ? history.push('/') : console.log("Error")
        console.log(data)
    }

    return (
        <div>
            <h1>QuestionCreate</h1>
            <Box
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
                    required
                /><br /><br />
                <TextField
                    id="outlined-textarea"
                    label="Description"
                    multiline
                    fullWidth
                    rows={6}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    required
                />
                <br /><br />
                <Button variant="contained" color="primary" type="submit" size="large">Post Question</Button>
                &nbsp;&nbsp;
                <Button variant="contained" color="primary" size="large" onClick={() => history.push("/")}>Go back</Button>
            </Box>
        </div>
    )
}

export default QuestionCreate
