import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';
import { CopyrightStringWithMailToAndDate } from './functions/brand/CopyrightStringWithMailToAndDate';
import { FetchCREATEApiKey } from './functions/requests/FetchCREATEApiKey';
import { DetectErrors } from './functions/errors/DetectErrors';

const theme = createTheme();

async function loginUser(credentials) {
    const response = await FetchCREATEApiKey(credentials);
    const data = await response.json();
    return [response, data];
}

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
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Welcome to BootCampCoder!
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
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
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}



