import { API } from '../../../App';

export async function FetchDELETEUser(bearer, token) {
    return fetch(API + `users/${bearer.id}`, {
        method: "DELETE",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
    });
}
