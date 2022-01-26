import { useHistory } from 'react-router-dom'
import { CreateTableContainerForQuestions } from './CreateTableContainerForQuestions';

export default function QuestionTable({ questions }) {
    const history = useHistory();

    function createData(question_id, question, comments_count, author, updated_at) {
        return { question_id, question, comments_count, author, updated_at };
    }
    const rows = questions?.map(question => {
        return createData(question.id, question.title, question.comments_count, question.author, question.updated_at);
    })

    function openComment(question_id) {
        return history.push(`/questions/${question_id}`)
    }

    return (
        CreateTableContainerForQuestions(rows, openComment)
    );
}

