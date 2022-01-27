import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function CreatePasswordFieldAndUpdateDeleteButtons(password, setPassword, handleUpdateGitHub, handleClickOpen) {
    return RenderPasswordFieldAndUpdateDeleteButtons();

    function RenderPasswordFieldAndUpdateDeleteButtons() {
        return <div style={{ backgroundColor: 'white', padding: '20px', width: '250px', borderRadius: '5px', margin: '0 auto' }}>
            {CreateTextFieldPassword()}
            <br /><br />
            {CreateButtonUpdateInformation()}
            <br /><br />
            {CreateButtonDeleteAccount()}
        </div>;
    }

    function CreateTextFieldPassword() {
        return <TextField id="outlined-basic" label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />;
    }

    function CreateButtonUpdateInformation() {
        return <Button variant="contained" color="primary" onClick={handleUpdateGitHub}>
            Update Information
        </Button>;
    }

    function CreateButtonDeleteAccount() {
        return <Button variant="contained" color="error" onClick={handleClickOpen}>
            Delete Account
        </Button>;
    }
}
