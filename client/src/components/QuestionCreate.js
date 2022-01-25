import React, { useState } from 'react'
import useToken from './functions/useToken';
import { useHistory } from 'react-router-dom';
import { GenerateFormQuestionCreate } from './functions/questions/create/GenerateFormQuestionCreate';
import { FetchPOSTNewQuestion } from './functions/requests/FetchPOSTNewQuestion';
import { DetectErrors } from './functions/DetectErrors';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';

function QuestionCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const history = useHistory();
    const { token } = useToken();
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);
    DetectErrors(errors, setDisabled, setErrors);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await FetchPOSTNewQuestion(token, title, body)
        const data = await res.json();
        res.status === 201 ? history.push('/') : CreateErrorModals(setErrors, data);
    }

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>New Question</h2>
            {GenerateFormQuestionCreate(handleSubmit, title, setTitle, body, setBody, history, disabled)}
            {errors}
        </div>
    )
}

export default QuestionCreate


