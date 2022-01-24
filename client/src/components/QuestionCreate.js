import React, { useState } from 'react'
import useToken from './functions/useToken';
import { useHistory } from 'react-router-dom';
import { GenerateFormQuestionCreate } from './functions/questions/GenerateFormQuestionCreate';
import { FetchPOSTNewQuestion } from './functions/requests/FetchPOSTNewQuestion';

function QuestionCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const history = useHistory();
    const { token } = useToken();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted")
        console.log(title)
        console.log(body)
        const res = await FetchPOSTNewQuestion(token, title, body)
        const data = await res.json();
        res.status === 201 ? history.push('/') : console.log("Error")
        console.log(data)
    }

    return (
        <div>
            <h1>QuestionCreate</h1>
            {GenerateFormQuestionCreate(handleSubmit, title, setTitle, body, setBody, history)}
        </div>
    )
}

export default QuestionCreate


