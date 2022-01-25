import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { theme } from '../../SignIn';
import { CreateSignInElementGrid } from './CreateSignInElementGrid';

export function CreateSignInPage(handleSubmit, disabled, errors) {
    return <ThemeProvider theme={theme}>
        {CreateSignInElementGrid(handleSubmit, disabled, errors)}
    </ThemeProvider>;
}

