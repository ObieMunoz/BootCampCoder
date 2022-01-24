import { API } from '../../../App';

export function FetchGETQuestions(token) {
    return fetch(API + 'questions', {
        method: "GET",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
}
