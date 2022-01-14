import React, { useState, useEffect } from 'react';
import useToken from '../App/useToken';
import ForumButtons from '../Forum/ForumButtons';
import QuestionTable from '../Forum/QuestionTable';

export default function Dashboard() {
    const { token } = useToken();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions()
    }, [])

    async function getQuestions() {
        const res = await fetch('http://localhost:3000/questions', {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const data = await res.json();
        return setQuestions(() => data);
    }

    function logQuestions() {
        console.log(questions);
    }

    return (
        <>
            <h2 onClick={logQuestions} style={{ textAlign: "center" }}>Dashboard</h2>
            <ForumButtons />
            <br />
            <QuestionTable questions={questions} />
        </>
    );
}