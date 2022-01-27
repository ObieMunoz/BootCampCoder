import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';
import { DetectErrors } from './functions/errors/DetectErrors';
import { registerUser } from './functions/signup/registerUser';
import { RenderSignUpPage } from './functions/signup/RenderSignUpPage';

export const theme = createTheme();

export default function SignUp({ setToken }) {
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);

    DetectErrors(errors, setDisabled, setErrors);

    const handleSubmit = async e => {
        e.preventDefault();
        const userCreationForm = new FormData(e.currentTarget);

        if (userCreationForm.get('username') === '' || userCreationForm.get('password') === '') {
            CreateErrorModals(setErrors, ['E-Mail and Password are required!']);
            return;
        }
        const [response, token] = await registerUser({
            user: {
                email: userCreationForm.get('email'),
                password: userCreationForm.get('password'),
                github_username: userCreationForm.get('github')
            }
        })
        response.status !== 201 ? CreateErrorModals(setErrors, token) : setToken(token);
    }


    return (
        RenderSignUpPage(handleSubmit, disabled, errors)
    );
}