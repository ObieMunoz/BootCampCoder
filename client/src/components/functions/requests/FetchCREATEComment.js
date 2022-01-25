import { API } from '../../../App';

export function FetchCREATEComment(token, replying, question_id) {
    return fetch(API + `comments`, {
        method: "POST",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            body: replying.body,
            question_id: question_id
        })
    });
}
