import { API } from '../../../App';

export function FetchDELETEComment(commend_id, token, question_id) {
    return fetch(API + `comments/${commend_id}`, {
        method: "DELETE",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            comment_id: commend_id,
            question_id: question_id
        })
    });
}
