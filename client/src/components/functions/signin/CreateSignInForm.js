import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Link } from 'react-router-dom';
import { CopyrightStringWithMailToAndDate } from '../brand/CopyrightStringWithMailToAndDate';

export function CreateSignInForm(handleSubmit, disabled, errors) {
    return <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password" />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item>
                <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Grid>
        {errors}
        <CopyrightStringWithMailToAndDate sx={{ mt: 5 }} />
    </Box>;
}
