import { API } from '../../../App';

export function FetchCREATEApiKey(credentials) {
    return fetch(`${API}api-keys`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Basic ' + btoa(`${credentials.email}:${credentials.password}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
}
