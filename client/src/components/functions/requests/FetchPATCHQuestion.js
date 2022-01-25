import { API } from '../../../App';

export async function FetchPATCHQuestion(question_id, token, questionFormData) {
    return fetch(API + `questions/${question_id}`, {
        method: "PATCH",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            title: questionFormData.title,
            body: questionFormData.body
        })
    });
}
