import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export function MapQuestionComments(question, commentEditMode, handleChangeComment, handleUpdateComment, handleCancelEditComment, bearer, handleEditComment, removeComment) {
    return question.comments.map(comment => {
        return (
            <div key={comment.id}>
                {commentEditMode.editing && commentEditMode.comment_id === comment.id
                    ? <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14, whiteSpace: 'pre-line' }} color="text.secondary" gutterBottom>
                                Comment from {comment.author} | {new Date(comment.created_at || comment.updated_at).toLocaleString()}
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
                                    onChange={handleChangeComment} />
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
                                Comment from {comment.author} | {new Date(comment.created_at || comment.updated_at).toLocaleString()}
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
        );
    }
    );
}
