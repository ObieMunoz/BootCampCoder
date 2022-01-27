import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';
import { DetectErrors } from './functions/errors/DetectErrors';
import { GenerateFormQuestionCreate } from './functions/questions/create/GenerateFormQuestionCreate';
import { FetchPOSTNewQuestion } from './functions/requests/FetchPOSTNewQuestion';
import useToken from './functions/useToken';

function QuestionCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);
    DetectErrors(errors, setDisabled, setErrors);
    const history = useHistory();
    const { token } = useToken();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await FetchPOSTNewQuestion(token, title, body)
        const data = await res.json();
        res.status === 201 ? history.push('/') : CreateErrorModals(setErrors, data);
    }

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '10px', marginTop: '20px' }}>
            <h1 className="subheading-drk">NEW QUESTION</h1>
            {GenerateFormQuestionCreate(handleSubmit, title, setTitle, body, setBody, history, disabled)}
            {errors}
        </div>
    )
}

export default QuestionCreate