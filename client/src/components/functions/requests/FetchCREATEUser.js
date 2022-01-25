import { API } from '../../../App';

export async function FetchCREATEUser(credentials) {
    return fetch(API + 'users', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(credentials)
    });
}
