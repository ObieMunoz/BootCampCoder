import React from 'react';
import TextField from '@mui/material/TextField';

export function CreateQuestionEditForm(questionFormData, handleChangeQuestion) {
    return <div>
        <TextField
            id="new-question-title-field"
            name="title"
            label="Question Title"
            type="text"
            fullWidth
            required
            value={questionFormData.title}
            onChange={handleChangeQuestion} />
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
            onChange={handleChangeQuestion} />
    </div>;
}
