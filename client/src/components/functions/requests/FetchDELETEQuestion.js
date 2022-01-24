import { API } from '../../../App';

export function FetchDELETEQuestion(question_id, token) {
    return fetch(API + `questions/${question_id}`, {
        method: "DELETE",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
}
