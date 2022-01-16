import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useToken from '../App/useToken';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function QuestionDetail() {
    let { question_id } = useParams();
    const { token, bearer } = useToken();
    const [question, setQuestion] = useState({});
    const [editedQuestion, setEditedQuestion] = useState({ title: '', body: '' });
    const [editingQuestionMode, setEditingQuestionMode] = useState(false);

    useEffect(() => {
        getQuestion()
    }, [])

    async function getQuestion() {
        const res = await fetch(`http://localhost:3000/questions/${question_id}`, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const data = await res.json();
        console.log(data)
        setEditedQuestion(() => data);
        return setQuestion(() => data);
    }

    async function handleDeleteQuestion() {
        const res = await fetch(`http://localhost:3000/questions/${question_id}`, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const data = await res.json();
        console.log(data)
    }

    async function handleUpdateQuestion() {
        const res = await fetch(`http://localhost:3000/questions/${question_id}`, {
            method: "PATCH",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ title: editedQuestion.title, body: editedQuestion.body })
        })
        const data = await res.json();
        console.log(data)
        if (data.errors) {
            // setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{data.errors}</Alert>)
            console.log(data.errors)
        } else {
            setEditingQuestionMode(() => false);
        }
    }

    return (
        <>
            <h2>Question Detail</h2>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Question from {question.author} | {new Date(question.created_at).toLocaleString()}
                    </Typography>
                    {editingQuestionMode
                        ? <TextField
                            id="new-question-title-field"
                            label="Question Title"
                            type="text"
                            value={editedQuestion.title}
                            fullWidth
                            required
                            onChange={e => setEditedQuestion({ ...editedQuestion, title: e.target.value })}
                        />
                        : <Typography variant="h4" component="div">
                            {editedQuestion.title}
                        </Typography>}
                    {editingQuestionMode
                        ? <>
                            <br /> <br />
                            <TextField
                                id="outlined-textarea"
                                label="Description"
                                multiline
                                fullWidth
                                value={editedQuestion.body}
                                rows={6}
                                required
                                onChange={e => setEditedQuestion({ ...editedQuestion, body: e.target.value })}
                            />
                        </>
                        :
                        <pre>
                            <Typography variant="body2" sx={{ fontSize: 20 }}>
                                {editedQuestion.body}
                            </Typography>
                        </pre>
                    }
                </CardContent>
                <CardActions>
                    {editingQuestionMode ? <>
                        <Button variant="contained" size="small" onClick={handleUpdateQuestion}>
                            Submit update
                        </Button>
                        <Button variant="contained" size="small" onClick={() => {
                            setEditingQuestionMode(false)
                            setEditedQuestion({ title: question.title, body: question.body })
                        }}>
                            Cancel
                        </Button>
                    </>
                        : <>
                            <Button size="small">Reply</Button>
                            {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={() => setEditingQuestionMode(!editingQuestionMode)}>Edit</Button> : null}
                            {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={handleDeleteQuestion}>Delete</Button> : null}
                        </>
                    }


                </CardActions>
            </Card>
            <h2>Comments</h2>
            {question.comments?.length > 0 ? question.comments.map(comment => {
                return (
                    <>
                        <Card sx={{ minWidth: 275 }} key={comment.id}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Comment from {comment.author} | {new Date(comment.created_at).toLocaleString()}
                                </Typography>
                                <pre>
                                    <Typography variant="body2" sx={{ fontSize: 20 }}>
                                        {comment.body}
                                    </Typography>
                                </pre>
                            </CardContent>
                            <CardActions>
                                {bearer.admin || (comment.author === bearer.email) ? <Button size="small">Edit</Button> : null}
                                {bearer.admin || (comment.author === bearer.email) ? <Button size="small">Delete</Button> : null}
                            </CardActions>
                        </Card>
                        <br />
                    </>
                )
            }
            ) : "No comments yet"}
        </>
    )
}

export default QuestionDetail