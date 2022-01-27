import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function CreateButtonsAndModalForAccountInformationEditMode(editMode, password, setPassword, handleUpdateGitHub, handleClickOpen, open, handleClose, deletionEMail, setDeletionEMail, handleDeleteAccount) {
    return <>

        {editMode
            ? <div style={{ textAlign: "center" }}>
                <div style={{ backgroundColor: 'white', padding: '20px', width: '250px', borderRadius: '5px', margin: '0 auto' }}>
                    <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={handleUpdateGitHub}>
                        Update Information
                    </Button>
                    <br /><br />
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                        Delete Account
                    </Button>
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This action is irreversible. Are you sure you want to delete your account?

                            Type your e-mail address as confirmation.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="deletion-password-field"
                            label="E-Mail Address"
                            type="E-Mail Address"
                            fullWidth
                            variant="standard"
                            value={deletionEMail}
                            onChange={(e) => setDeletionEMail(e.target.value)}
                            required />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} value="cancel">Cancel</Button>
                        <Button onClick={handleDeleteAccount} value="delete-account" color="error">Yes, Delete Account</Button>
                    </DialogActions>
                </Dialog>
            </div>
            : null}
        <br />
    </>;
}
