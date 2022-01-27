import Alert from '@mui/material/Alert';
import React from 'react';
import { nanoid } from 'nanoid';

export function CreateErrorModals(setErrors, token) {
    if (typeof token.errors === 'string') {
        setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{token.errors}</Alert>);
    } else if (typeof token === 'object') {
        const errors = token.map((error) => {
            return <div className="errors" key={nanoid()}>
                <br />
                <Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{error}</Alert>
            </div>
        }
        )
        setErrors(errors);
    }
}
