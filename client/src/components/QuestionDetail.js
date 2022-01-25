import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import useToken from './functions/useToken';
import { FetchDELETEQuestion } from './functions/requests/FetchDELETEQuestion';
import { FetchPATCHQuestion } from './functions/requests/FetchPATCHQuestion';
import { FetchDELETEComment } from './functions/requests/FetchDELETEComment';
import { FetchPATCHComment } from './functions/requests/FetchPATCHComment';
import { FetchCREATEComment } from './functions/requests/FetchCREATEComment';
import { DetectErrors } from './functions/errors/DetectErrors';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';
import { GetQuestionData } from './functions/questions/detail/GetQuestionData';
import { MapQuestionComments } from './functions/questions/detail/MapQuestionComments';
import { CreateReplyForm } from './functions/questions/detail/CreateReplyForm';
import { CreateQuestionDisplayCard } from './functions/questions/detail/CreateQuestionDisplayCard';

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

    GetQuestionData(question_id, token, setQuestion, setQuestionFormData);

    async function handleDeleteQuestion() {
        const res = await FetchDELETEQuestion(question_id, token);
        if (res.status === 202) history.push('/');
    }

    async function handleUpdateQuestion() {
        const res = await FetchPATCHQuestion(question_id, token, questionFormData)
        const data = await res.json();
        if (data.errors) {
            CreateErrorModals(setErrors, data.errors);
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
        FetchDELETEComment(commend_id, token, question_id);
        const newComments = question.comments.filter(comment => comment.id !== commend_id);
        setQuestion(() => ({ ...question, comments: newComments }));
    }

    function handleChangeComment(e) {
        setCommentEditMode(() => ({ ...commentEditMode, body: e.target.value }))
    }

    function handleEditComment(comment_id, comment_body, question_id) {
        setCommentEditMode(() => ({ ...commentEditMode, editing: true, comment_id: comment_id, body: comment_body, question_id: question_id }))
        console.log(commentEditMode)
    }

    async function handleUpdateComment() {
        const res = await FetchPATCHComment(commentEditMode, token)
        const data = await res.json()
        setCommentEditMode(() => ({ ...commentEditMode, editing: false }))
        if (data.errors) {
            CreateErrorModals(setErrors, data.errors);
        } else {
            const newComments = question.comments.map(comment => {
                if (comment.id === data.id) {
                    return { ...comment, body: commentEditMode.body }
                } else {
                    return comment
                }
            })
            setQuestion(() => ({ ...question, comments: newComments }))
        }
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
        const res = await FetchCREATEComment(token, replying, question_id);
        const data = await res.json();
        if (res.status === 201) {
            console.log(data)
            setReplying(() => ({ ...replying, replying: false, body: '' }))
            console.log(question.comments)
            const newComments = [...question.comments, data];
            console.log(newComments)
            setQuestion(() => ({ ...question, comments: newComments }));
        } else {
            CreateErrorModals(setErrors, { comment: ['must not be blank'] })
        }
    }

    return (
        <div>
            <h2>Question Detail</h2>
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

            <h2>Comments</h2>

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
        </div>
    )
}

export default QuestionDetail