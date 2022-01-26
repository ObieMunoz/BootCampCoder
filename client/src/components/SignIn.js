import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';
import { DetectErrors } from './functions/errors/DetectErrors';
import { CreateSignInPage } from './functions/signin/CreateSignInPage';
import { loginUser } from './functions/signin/loginUser';

export const theme = createTheme();

export default function SignIn({ setToken }) {
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);
    DetectErrors(errors, setDisabled, setErrors);

    async function handleSubmit(event) {
        event.preventDefault();
        const credentials = new FormData(event.currentTarget)
        const [response, token] = await loginUser({
            email: credentials.get('email'),
            password: credentials.get('password'),
        });
        if (response.status !== 201) {
            CreateErrorModals(setErrors, token);
        } else {
            setToken(token);
        }
    }

    return (
        CreateSignInPage(handleSubmit, disabled, errors)
    );
}