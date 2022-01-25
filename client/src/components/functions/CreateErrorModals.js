import Alert from '@mui/material/Alert';
import React from 'react';

export function CreateErrorModals(setErrors, token) {
    if (typeof token.errors === 'string') {
        setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{token.errors}</Alert>);
    } else if (token.errors.length > 0) {
        setErrors(token.errors.map((error, index) => {
            return <Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }} key={index}>{error}</Alert>;
        }));
    }
    console.log(token.errors);
}
