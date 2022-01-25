import React, { useState, useEffect } from 'react';
import useToken from './functions/useToken';
import ForumButtons from './functions/questions/ForumButtons';
import QuestionTable from './functions/questions/QuestionTable';
import { useHistory } from 'react-router-dom';
import { FetchGETQuestions } from './functions/requests/FetchGETQuestions';
import discussionBoardBanner from '../assets/discussion.png'

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
            {/* <h2 style={{ textAlign: "center" }}>Discussion Board</h2> */}
            <img src={discussionBoardBanner} alt="discussion board" style={{ display: 'flex', margin: '0 auto', width: '60vw' }} />
            <ForumButtons />
            <br />
            <QuestionTable questions={questions} />
        </>
    );
}


