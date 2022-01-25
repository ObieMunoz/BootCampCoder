import React from 'react';
import Typography from '@mui/material/Typography';

export function StandardQuestionView(questionFormData) {
    return <div>
        <Typography variant="h4" component="div">
            {questionFormData.title}
        </Typography>
        <pre>
            <Typography variant="body2" sx={{ fontSize: 20, whiteSpace: 'pre-line' }}>
                {questionFormData.body}
            </Typography>
        </pre>
    </div>;
}
