import Alert from '@mui/material/Alert';
import React from 'react';

export function CreateErrorModals(setErrors, token) {
    if (typeof token.errors === 'string') {
        setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{token.errors}</Alert>);
    } else if (typeof token === 'object') {
        console.log(token)
        const errors = token.map((error) => {
            return <>
                <br />
                <Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{error}</Alert>;
            </>
        })
        setErrors(errors);
    }
}
