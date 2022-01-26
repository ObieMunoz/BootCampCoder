import { useEffect } from 'react';
import { FetchGETQuestion } from '../../requests/FetchGETQuestion';

export function GetQuestionData(question_id, token, setQuestion, setQuestionFormData) {
    useEffect(() => {
        getQuestion();
        async function getQuestion() {
            const res = await FetchGETQuestion(question_id, token);
            const data = await res.json();
            return (
                setQuestion(() => data),
                setQuestionFormData(() => ({ title: data.title, body: data.body }))
            );
        }
    }, [question_id, setQuestion, setQuestionFormData, token]);
}
