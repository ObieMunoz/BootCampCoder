import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ForumButtons from './functions/questions/ForumButtons';
import QuestionTable from './functions/questions/QuestionTable';
import { FetchGETQuestions } from './functions/requests/FetchGETQuestions';
import useToken from './functions/useToken';

export default function Dashboard() {
    const { token } = useToken();
    const [questions, setQuestions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname !== '/') history.push('/')
        getQuestions()
    }, [])

    async function getQuestions() {
        const res = await FetchGETQuestions(token);
        const data = await res.json();
        return setQuestions(() => data);
    }

    return (
        <>
            <h1 className="subheading">DISCUSSION BOARD</h1>
            <ForumButtons />
            <br />
            <QuestionTable questions={questions} />
        </>
    );
}