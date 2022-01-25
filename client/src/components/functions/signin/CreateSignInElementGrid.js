import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import React from 'react';
import { CreateBackgroundImage } from './CreateBackgroundImage';
import { CreateSignInFormContainer } from './CreateSignInFormContainer';

export function CreateSignInElementGrid(handleSubmit, disabled, errors) {
    return <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {CreateBackgroundImage()}
        {CreateSignInFormContainer(handleSubmit, disabled, errors)}
    </Grid>;
}