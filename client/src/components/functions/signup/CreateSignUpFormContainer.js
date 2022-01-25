import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { CreateSignUpForm } from './CreateSignUpForm';

export function CreateSignUpFormContainer(handleSubmit, disabled) {
    return <Box
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
        {CreateSignUpForm(handleSubmit, disabled)}
    </Box>;
}

