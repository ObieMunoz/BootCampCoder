import { FetchCREATEUser } from '../requests/FetchCREATEUser';

export async function registerUser(credentials) {
    const response = await FetchCREATEUser(credentials);
    const data = await response.json();
    return [response, data];
}
