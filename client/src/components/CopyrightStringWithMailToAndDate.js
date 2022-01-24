import Typography from '@mui/material/Typography';
import React from 'react';
import { createMailToLink } from './createMailToLink';

export function CopyrightStringWithMailToAndDate() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            {'Copyright © '}
            {createMailToLink()}
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}
