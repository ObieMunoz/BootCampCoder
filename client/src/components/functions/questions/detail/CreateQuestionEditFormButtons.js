import React from 'react';
import Button from '@mui/material/Button';

export function CreateQuestionEditFormButtons(handleUpdateQuestion, disabled, handleCancelEditQuestion) {
    return <>
        <Button variant="contained" size="small" onClick={handleUpdateQuestion} disabled={disabled}>
            Submit update
        </Button>
        <Button variant="contained" size="small" onClick={handleCancelEditQuestion}>
            Cancel
        </Button>
    </>;
}
