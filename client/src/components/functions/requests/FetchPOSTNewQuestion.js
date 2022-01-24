import { API } from '../../../App';

export function FetchPOSTNewQuestion(token, title, body) {
    return fetch(API + `questions`, {
        method: "POST",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            title: title,
            body: body
        })
    });
}
