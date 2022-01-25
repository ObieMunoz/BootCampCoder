import { API } from '../../../App';

export function FetchGETQuestion(question_id, token) {
    return fetch(API + `questions/${question_id}`, {
        method: "GET",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
}
