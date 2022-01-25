import { API } from '../../../App';

export async function FetchPATCHComment(commentEditMode, token) {
    return fetch(API + `comments/${commentEditMode.comment_id}`, {
        method: "PATCH",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            body: commentEditMode.body,
            question_id: commentEditMode.question_id
        })
    });
}
