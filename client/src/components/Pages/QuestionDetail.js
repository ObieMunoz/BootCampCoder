import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useToken from '../App/useToken';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function QuestionDetail() {
    let { question_id } = useParams();
    const { token, bearer } = useToken();
    const [question, setQuestion] = useState({});

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
        return setQuestion(() => data);
    }

    return (
        <>
            <h2>Question Detail</h2>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Question from {question.author} | {new Date(question.created_at).toLocaleString()}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {question.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 20 }}>
                        {question.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Reply</Button>
                    {bearer.admin || (question.author === bearer.email) ? <Button size="small">Edit</Button> : null}
                    {bearer.admin || (question.author === bearer.email) ? <Button size="small">Delete</Button> : null}
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
                                <Typography variant="body2" sx={{ fontSize: 20 }}>
                                    {comment.body}
                                </Typography>
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