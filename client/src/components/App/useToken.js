import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token?.token || userToken?.token;
    };

    const getBearer = () => {
        const tokenString = sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        return userToken?.bearer || userToken?.user
    }

    const [token, setToken] = useState(getToken());
    const [tokenId, setTokenId] = useState(null)
    const [bearer, setBearer] = useState(getBearer())

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token?.token || userToken.token);
        setTokenId(userToken.token?.id || userToken.id);
        setBearer(userToken.user);
    };

    return {
        setToken: saveToken,
        token,
        tokenId,
        bearer
    }
}