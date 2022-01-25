import Alert from '@mui/material/Alert';
import React from 'react';
import { nanoid } from 'nanoid';

export function CreateErrorModals(setErrors, token) {
    console.log(token)
    if (typeof token.errors === 'string') {
        setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{token.errors}</Alert>);
    } else if (typeof token === 'object') {
        console.log(token)
        const errors = token.map((error) => {
            return <div className="errors" key={nanoid()}>
                <br />
                <Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{error}</Alert>
            </div>
        }
        )
        // const errors = Object.keys(token).map(key => {
        //     return token[key].map(error => {
        //         key = key.charAt(0).toUpperCase() + key.slice(1);
        //         return <>
        //             <br />
        //             <Alert key={error} severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{key} {error}</Alert>
        //             <br />
        //         </>
        //     })
        // })
        setErrors(errors);
    }
}
