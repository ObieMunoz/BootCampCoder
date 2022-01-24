import Typography from '@mui/material/Typography';
import React from 'react';
import { CreateMailToLink } from './CreateMailToLink';

export function CopyrightStringWithMailToAndDate() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            {'Copyright © '}
            {CreateMailToLink()}
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}