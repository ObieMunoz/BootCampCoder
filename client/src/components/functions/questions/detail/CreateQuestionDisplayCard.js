import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { StandardQuestionButtons } from './StandardQuestionButtons';
import { CreateQuestionEditFormButtons } from './CreateQuestionEditFormButtons';
import { StandardQuestionView } from './StandardQuestionView';
import { CreateQuestionEditForm } from './CreateQuestionEditForm';

export function CreateQuestionDisplayCard(
    question,
    questionEditMode,
    questionFormData,
    handleChangeQuestion,
    handleUpdateQuestion,
    disabled,
    handleCancelEditQuestion,
    handleEnterReply,
    bearer,
    handleEditQuestion,
    handleDeleteQuestion) {
    return <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Question from {question.author} | {new Date(question.created_at).toLocaleString()}
            </Typography>
            {questionEditMode
                ? CreateQuestionEditForm(questionFormData, handleChangeQuestion)
                : StandardQuestionView(questionFormData)}
        </CardContent>
        <CardActions>
            {questionEditMode
                ? CreateQuestionEditFormButtons(
                    handleUpdateQuestion,
                    disabled,
                    handleCancelEditQuestion
                )
                : StandardQuestionButtons(
                    handleEnterReply,
                    bearer,
                    question,
                    handleEditQuestion,
                    handleDeleteQuestion
                )}
        </CardActions>
    </Card>;
}
