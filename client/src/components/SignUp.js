import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CopyrightStringWithMailToAndDate } from './functions/brand/CopyrightStringWithMailToAndDate';
import Alert from '@mui/material/Alert';
import { FetchCREATEUser } from './functions/requests/FetchCREATEUser';
import { DetectErrors } from './functions/errors/DetectErrors';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';

const theme = createTheme();

async function registerUser(credentials) {
    const response = await FetchCREATEUser(credentials);
    const data = await response.json();
    return [response, data];
}

export default function SignUp({ setToken }) {
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);

    DetectErrors(errors, setDisabled, setErrors);

    const handleSubmit = async e => {
        e.preventDefault();
        const userCreationForm = new FormData(e.currentTarget);

        if (userCreationForm.get('username') === '' || userCreationForm.get('password') === '') {
            setErrors(() => [<Alert key={"invalid-email-password"} severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>E-Mail and Password are required</Alert>]);
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up for BootCampCoder
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="github"
                                    label="GitHub Account"
                                    name="github"
                                    autoComplete="github"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
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
                    </Box>
                </Box>
                {errors}
                <CopyrightStringWithMailToAndDate sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}