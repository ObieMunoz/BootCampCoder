import { FetchCREATEApiKey } from '../requests/FetchCREATEApiKey';

export async function loginUser(credentials) {
    const response = await FetchCREATEApiKey(credentials);
    const data = await response.json();
    return [response, data];
}
