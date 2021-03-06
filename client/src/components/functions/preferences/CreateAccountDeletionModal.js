import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function CreateAccountDeletionModal(open, handleClose, deletionEMail, setDeletionEMail, handleDeleteAccount) {
    return RenderDialog();

    function RenderDialog() {
        return <Dialog open={open} onClose={handleClose}>
            {CreateDialogTitle()}
            {CreateDialogContentWithTextAndTextField()}
            {CreateDialogActionButtons()}
        </Dialog>;
    }

    function CreateDialogActionButtons() {
        return <DialogActions>
            <Button onClick={handleClose} value="cancel">Cancel</Button>
            <Button onClick={handleDeleteAccount} value="delete-account" color="error">Yes, Delete Account</Button>
        </DialogActions>;
    }

    function CreateDialogContentWithTextAndTextField() {
        return <DialogContent>
            {CreateDialogContentText()}
            {CreateDialogTextField()}
        </DialogContent>;
    }

    function CreateDialogTextField() {
        return <TextField
            autoFocus
            margin="dense"
            id="deletion-password-field"
            label="E-Mail Address"
            type="E-Mail Address"
            fullWidth
            variant="standard"
            value={deletionEMail}
            onChange={(e) => setDeletionEMail(e.target.value)}
            required />;
    }

    function CreateDialogTitle() {
        return <DialogTitle>Delete Account</DialogTitle>;
    }

    function CreateDialogContentText() {
        return <DialogContentText>
            This action is irreversible. Are you sure you want to delete your account?

            Type your e-mail address as confirmation.
        </DialogContentText>;
    }
}
