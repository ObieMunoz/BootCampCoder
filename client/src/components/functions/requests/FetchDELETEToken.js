import { API } from '../../../App';

export function FetchDELETEToken(tokenId, token) {
    return fetch(API + 'api-keys/' + tokenId, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
}
