import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export function CreateSignUpForm(handleSubmit, disabled) {
    return <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="github"
                    label="GitHub Account"
                    name="github"
                    autoComplete="github" />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password" />
            </Grid>

        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={disabled}
            sx={{ mt: 3, mb: 2 }}
        >
            Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link to="/" variant="body2">
                    Already have an account? Sign in
                </Link>
            </Grid>
        </Grid>
    </Box>;
}
