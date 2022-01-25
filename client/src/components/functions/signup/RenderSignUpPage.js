import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { CopyrightStringWithMailToAndDate } from '../brand/CopyrightStringWithMailToAndDate';
import { theme } from '../../SignUp';
import { CreateSignUpFormContainer } from './CreateSignUpFormContainer';

export function RenderSignUpPage(handleSubmit, disabled, errors) {
    return <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {CreateSignUpFormContainer(handleSubmit, disabled)}
            {errors}
            <CopyrightStringWithMailToAndDate sx={{ mt: 5 }} />
        </Container>
    </ThemeProvider>;
}

