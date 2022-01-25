import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function CreateReplyForm(replying, setReplying, handleNewComment, disabled, handleCancelNewComment) {
    return <div>
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
            onChange={(e) => setReplying(() => ({ ...replying, body: e.target.value }))} />
        <br /><br />
        <Button variant="contained" size="small" onClick={handleNewComment} disabled={disabled}>
            Submit update
        </Button> &nbsp;&nbsp;
        <Button variant="contained" size="small" onClick={handleCancelNewComment}>
            Cancel
        </Button>
    </div>;
}
