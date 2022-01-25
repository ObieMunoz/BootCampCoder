import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import useToken from './functions/useToken';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FetchDELETEQuestion } from './functions/requests/FetchDELETEQuestion';
import { FetchGETQuestion } from './functions/requests/FetchGETQuestion';
import { FetchPATCHQuestion } from './functions/requests/FetchPATCHQuestion';
import { FetchDELETEComment } from './functions/requests/FetchDELETEComment';
import { FetchPATCHComment } from './functions/requests/FetchPATCHComment';
import { FetchCREATEComment } from './functions/requests/FetchCREATEComment';
import { DetectErrors } from './functions/errors/DetectErrors';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';

function QuestionDetail() {
    let { question_id } = useParams();
    const { token, bearer } = useToken();
    const [question, setQuestion] = useState({});
    const [questionEditMode, setQuestionEditMode] = useState(false);
    const [questionFormData, setQuestionFormData] = useState({ title: '', body: '' });
    const [commentEditMode, setCommentEditMode] = useState({ body: '', comment_id: 0, question_id: 0, editing: false });
    const [replying, setReplying] = useState({ body: '', replying: false });
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);
    DetectErrors(errors, setDisabled, setErrors);

    const history = useHistory();

    useEffect(() => {
        getQuestion()
    }, [])

    async function getQuestion() {
        const res = await FetchGETQuestion(question_id, token);
        const data = await res.json();
        console.log(data)
        return (
            setQuestion(() => data),
            setQuestionFormData(() => ({ title: data.title, body: data.body }))
        )
    }

    async function handleDeleteQuestion() {
        const res = await FetchDELETEQuestion(question_id, token);
        const data = await res.json();
        console.log(data)
        history.push('/');
    }

    async function handleUpdateQuestion() {
        const res = await FetchPATCHQuestion(question_id, token, questionFormData)
        const data = await res.json();
        console.log(data)
        if (data.errors) {
            // setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{data.errors}</Alert>)
            console.log(data.errors)
        } else {
            setQuestionEditMode(() => false);
        }
    }

    function handleEditQuestion() {
        setQuestionEditMode(() => true);
    }

    function handleCancelEditQuestion() {
        setQuestionEditMode(() => false);
        setQuestionFormData(() => ({ title: question.title, body: question.body }));
    }

    function handleChangeQuestion(e) {
        setQuestionFormData(() => ({ ...questionFormData, [e.target.name]: e.target.value }))
    }

    async function removeComment(commend_id, question_id) {
        const res = await FetchDELETEComment(commend_id, token, question_id);
        const data = await res.json();
        console.log(data)
        getQuestion();
    }

    function handleChangeComment(e) {
        setCommentEditMode(() => ({ ...commentEditMode, body: e.target.value }))
        console.log(commentEditMode)
    }

    function handleEditComment(comment_id, comment_body, question_id) {
        setCommentEditMode(() => ({ ...commentEditMode, editing: true, comment_id: comment_id, body: comment_body, question_id: question_id }))
        console.log(commentEditMode)
    }

    async function handleUpdateComment() {
        const res = FetchPATCHComment(commentEditMode, token)
        res.then(data => {
            setCommentEditMode(() => ({ ...commentEditMode, editing: false }))
            getQuestion();
        })
    }

    function handleCancelEditComment() {
        setCommentEditMode(() => ({ ...commentEditMode, editing: false, body: '' }))
    }

    function handleEnterReply() {
        setReplying(() => ({ ...replying, replying: true }))
    }

    function handleCancelNewComment() {
        setReplying(() => ({ ...replying, replying: false, body: '' }))
    }

    async function handleNewComment() {
        const res = FetchCREATEComment(token, replying, question_id);
        if (await res.status === 201) {
            setReplying(() => ({ ...replying, replying: false, body: '' }))
            getQuestion();
        } else {
            CreateErrorModals(setErrors, { comment: ['must not be blank'] })
        }
    }

    return (
        <div>
            <h2>Question Detail</h2>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Question from {question.author} | {new Date(question.created_at).toLocaleString()}
                    </Typography>
                    {questionEditMode
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
                                <Typography variant="body2" sx={{ fontSize: 20, whiteSpace: 'pre-line' }}>
                                    {questionFormData.body}
                                </Typography>
                            </pre>
                        </div>
                    }
                </CardContent>
                <CardActions>
                    {questionEditMode ? <>
                        <Button variant="contained" size="small" onClick={handleUpdateQuestion}>
                            Submit update
                        </Button>
                        <Button variant="contained" size="small" onClick={handleCancelEditQuestion}>
                            Cancel
                        </Button>
                    </>
                        : <>
                            <Button size="small" onClick={handleEnterReply}>Reply</Button>
                            {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={handleEditQuestion}>Edit</Button> : null}
                            {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={handleDeleteQuestion}>Delete</Button> : null}
                        </>
                    }
                </CardActions>
            </Card>
            {replying.replying
                ? <div>
                    <h3>New Reply</h3>
                    <TextField
                        id="outlined-textarea"
                        name="body"
                        label="Reply"
                        multiline
                        fullWidth
                        rows={6}
                        required
                        value={replying.body}
                        onChange={(e) => setReplying(() => ({ ...replying, body: e.target.value }))}
                    />
                    <br /><br />
                    <Button variant="contained" size="small" onClick={handleNewComment} disabled={disabled}>
                        Submit update
                    </Button> &nbsp;&nbsp;
                    <Button variant="contained" size="small" onClick={handleCancelNewComment}>
                        Cancel
                    </Button>
                </div>
                : null}
            {errors}
            <h2>Comments</h2>
            {question.comments?.length > 0 ? question.comments.map(comment => {
                return (
                    <div key={comment.id}>
                        {commentEditMode.editing && commentEditMode.comment_id === comment.id
                            ? <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14, whiteSpace: 'pre-line' }} color="text.secondary" gutterBottom>
                                        Comment from {comment.author} | {new Date(comment.created_at).toLocaleString()}
                                    </Typography>
                                    <pre>
                                        <TextField
                                            id={`comment-edit-field-${comment.id}`}
                                            name="comment-edit-field"
                                            label="Comment Body"
                                            type="text"
                                            fullWidth
                                            required
                                            value={commentEditMode.body}
                                            onChange={handleChangeComment}
                                        />
                                    </pre>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" size="small" onClick={handleUpdateComment}>
                                        Submit Comment
                                    </Button>
                                    <Button variant="contained" size="small" onClick={handleCancelEditComment}>
                                        Cancel
                                    </Button>
                                </CardActions>
                            </Card>
                            : <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Comment from {comment.author} | {new Date(comment.created_at).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: 20, whiteSpace: 'pre-line' }}>
                                        {comment.body}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {bearer.admin || (comment.author === bearer.email) ? <Button size="small" onClick={() => handleEditComment(comment.id, comment.body, comment.question_id)}>Edit</Button> : null}
                                    {bearer.admin || (comment.author === bearer.email) ? <Button size="small" onClick={() => removeComment(comment.id, comment.question_id)}>Delete</Button> : null}
                                </CardActions>
                            </Card>}
                        <br />
                    </div>
                )
            }
            ) : "No comments yet"}
        </div>
    )
}

export default QuestionDetail


