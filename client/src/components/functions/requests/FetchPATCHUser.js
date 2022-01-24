import { API } from '../../../App';

export function FetchPATCHUser(bearer, token, password, newGitHubUsername) {
    return fetch(API + `users/${bearer.id}`, {
        method: "PATCH",
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            user: {
                password: password,
                github_username: newGitHubUsername
            }
        })
    });
}
