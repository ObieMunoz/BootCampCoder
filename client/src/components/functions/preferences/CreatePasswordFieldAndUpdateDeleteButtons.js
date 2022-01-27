import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function CreatePasswordFieldAndUpdateDeleteButtons(password, setPassword, handleUpdateGitHub, handleClickOpen) {
    return <div style={{ backgroundColor: 'white', padding: '20px', width: '250px', borderRadius: '5px', margin: '0 auto' }}>
        <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        <Button variant="contained" color="primary" onClick={handleUpdateGitHub}>
            Update Information
        </Button>
        <br /><br />
        <Button variant="contained" color="error" onClick={handleClickOpen}>
            Delete Account
        </Button>
    </div>;
}
