import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
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
    const [editingQuestionMode, setEditingQuestionMode] = useState(false);
    const [questionFormData, setQuestionFormData] = useState({ title: '', body: '' });
    const [commentFormData, setCommentFormData] = useState({ body: '', comment_id: 0 });
    const history = useHistory();

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
        return (
            setQuestion(() => data),
            setQuestionFormData(() => ({ title: data.title, body: data.body }))
        )
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
        history.push('/');
    }

    async function handleUpdateQuestion() {
        const res = await fetch(`http://localhost:3000/questions/${question_id}`, {
            method: "PATCH",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                title: questionFormData.title,
                body: questionFormData.body
            })
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

    function handleEditQuestion() {
        setEditingQuestionMode(() => true);
    }

    function handleCancelEditQuestion() {
        setEditingQuestionMode(() => false);
        setQuestionFormData(() => ({ title: question.title, body: question.body }));
    }

    function handleChangeQuestion(e) {
        setQuestionFormData(() => ({ ...questionFormData, [e.target.name]: e.target.value }))
    }

    async function removeComment(commend_id, question_id) {
        const res = await fetch(`http://localhost:3000/comments/${commend_id}`, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                comment_id: commend_id,
                question_id: question_id
            })
        });
        const data = await res.json();
        console.log(data)
        getQuestion();
    }

    return (
        <div>
            <h2>Question Detail</h2>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Question from {question.author} | {new Date(question.created_at).toLocaleString()}
                    </Typography>
                    {editingQuestionMode
                        ? <div>
                            <TextField
                                id="new-question-title-field"
                                name="title"
                                label="Question Title"
                                type="text"
                                fullWidth
                                required
                                value={questionFormData.title}
                                onChange={handleChangeQuestion}
                            />
                            <br /> <br />
                            <TextField
                                id="outlined-textarea"
                                name="body"
                                label="Description"
                                multiline
                                fullWidth
                                rows={6}
                                required
                                value={questionFormData.body}
                                onChange={handleChangeQuestion}
                            />
                        </div>
                        : <div>
                            <Typography variant="h4" component="div">
                                {questionFormData.title}
                            </Typography>
                            <pre>
                                <Typography variant="body2" sx={{ fontSize: 20 }}>
                                    {questionFormData.body}
                                </Typography>
                            </pre>
                        </div>
                    }
                </CardContent>
                <CardActions>
                    {editingQuestionMode ? <>
                        <Button variant="contained" size="small" onClick={handleUpdateQuestion}>
                            Submit update
                        </Button>
                        <Button variant="contained" size="small" onClick={handleCancelEditQuestion}>
                            Cancel
                        </Button>
                    </>
                        : <>
                            <Button size="small">Reply</Button>
                            {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={handleEditQuestion}>Edit</Button> : null}
                            {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={handleDeleteQuestion}>Delete</Button> : null}
                        </>
                    }


                </CardActions>
            </Card>
            <h2>Comments</h2>
            {question.comments?.length > 0 ? question.comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <Card sx={{ minWidth: 275 }}>
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
                                {bearer.admin || (comment.author === bearer.email) ? <Button size="small" onClick={() => removeComment(comment.id, comment.question_id)}>Delete</Button> : null}
                            </CardActions>
                        </Card>
                        <br />
                    </div>
                )
            }
            ) : "No comments yet"}
        </div>
    )
}

export default QuestionDetail