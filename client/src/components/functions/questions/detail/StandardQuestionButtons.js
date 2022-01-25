import React from 'react';
import Button from '@mui/material/Button';

export function StandardQuestionButtons(handleEnterReply, bearer, question, handleEditQuestion, handleDeleteQuestion) {
    return <>
        <Button size="small" onClick={handleEnterReply}>Reply</Button>
        {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={handleEditQuestion}>Edit</Button> : null}
        {bearer.admin || (question.author === bearer.email) ? <Button size="small" onClick={handleDeleteQuestion}>Delete</Button> : null}
    </>;
}
