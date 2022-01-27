import React from 'react';
import { CreateQuestionDisplayCard } from './CreateQuestionDisplayCard';
import { CreateReplyForm } from './CreateReplyForm';
import { MapQuestionComments } from './MapQuestionComments';

export function RenderQuestionDisplay(question, questionEditMode, questionFormData, handleChangeQuestion, handleUpdateQuestion, disabled, handleCancelEditQuestion, handleEnterReply, bearer, handleEditQuestion, handleDeleteQuestion, replying, setReplying, handleNewComment, handleCancelNewComment, errors, commentEditMode, handleChangeComment, handleUpdateComment, handleCancelEditComment, handleEditComment, removeComment) {
    return <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '10px', marginTop: '20px' }}>
        <h1 className='subheading-drk'>QUESTION DETAIL</h1>
        {CreateQuestionDisplayCard(
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
            handleDeleteQuestion
        )}
        <h1 className='subheading-drk'>COMMENTS</h1>
        {replying.replying
            ? CreateReplyForm(
                replying,
                setReplying,
                handleNewComment,
                disabled,
                handleCancelNewComment
            )
            : null}

        {errors}

        {question.comments?.length > 0
            ? MapQuestionComments(
                question,
                commentEditMode,
                handleChangeComment,
                handleUpdateComment,
                handleCancelEditComment,
                bearer,
                handleEditComment,
                removeComment
            )
            : "No comments yet"}
    </div>;
}
