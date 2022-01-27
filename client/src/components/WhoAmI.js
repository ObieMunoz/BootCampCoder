import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './functions/useToken';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FetchPATCHUser } from './functions/requests/FetchPATCHUser';
import { FetchDELETEUser } from './functions/requests/FetchDELETEUser';
import { DetectErrors } from './functions/errors/DetectErrors';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';
import { CreateAccountInformationTable } from './functions/preferences/CreateAccountInformationTable';

function WhoAmI() {
    const { token, bearer } = useToken();
    const [editMode, setEditMode] = useState(false);
    const [currentGitHubUser, setCurrentGitHubUser] = useState(bearer.github_username);
    const [newGitHubUsername, setNewGitHubUsername] = useState(bearer.github_username || '');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [deletionEMail, setDeletionEMail] = useState('');
    const history = useHistory();

    DetectErrors(errors, setDisabled, setErrors);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
        setDeletionEMail('');
    };

    function handleToggleEditMode() {
        setEditMode(() => !editMode);
    }

    async function handleUpdateGitHub() {
        const res = await FetchPATCHUser(bearer, token, password, newGitHubUsername)
        const data = await res.json();
        if (res.status !== 202) {
            CreateErrorModals(setErrors, data);
        } else {
            setEditMode(() => false);
            setPassword(() => '');
            const tokenString = sessionStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            if (userToken.user) {
                userToken.user.github_username = newGitHubUsername;
                bearer.github_username = newGitHubUsername;
                setCurrentGitHubUser(() => newGitHubUsername);
            } else if (userToken.bearer) {
                userToken.bearer.github_username = newGitHubUsername;
                bearer.github_username = newGitHubUsername;
                setCurrentGitHubUser(() => newGitHubUsername);
            }
            sessionStorage.setItem('token', JSON.stringify(userToken));
        }
    }

    async function handleDeleteAccount(e) {
        if (e.target.value === 'delete-account' && deletionEMail === bearer.email) {
            const res = await FetchDELETEUser(bearer, token)
            const data = await res.json();
            if (res.status !== 200) {
                CreateErrorModals(setErrors, data);
                setOpen(false)
            } else {
                sessionStorage.removeItem('token');
                history.push('/');
                window.location.reload();
            }
        } else if (deletionEMail !== bearer.email) {
            CreateErrorModals(setErrors, ['Please enter your email address to delete your account.']);
            setOpen(false)
        }
    }

    return (
        <>
            <h3 className="subheading-sm" style={{ textAlign: 'left' }}>EDIT PROFILE:
                <Switch onChange={handleToggleEditMode} checked={editMode}></Switch>
            </h3>
            {CreateAccountInformationTable(bearer, editMode, newGitHubUsername, setNewGitHubUsername, token)}
            <br />
            <br />
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
                                required
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} value="cancel">Cancel</Button>
                            <Button onClick={handleDeleteAccount} value="delete-account" color="error">Yes, Delete Account</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                : null}
            <br />
            {errors}
        </>
    )
}

export default WhoAmI


