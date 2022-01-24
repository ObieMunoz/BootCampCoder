import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './useToken';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API } from '../App'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function WhoAmI() {
    const { token, bearer } = useToken();
    const [editMode, setEditMode] = useState(false);
    const [currentGitHubUser, setCurrentGitHubUser] = useState(bearer.github_username);
    const [newGitHubUsername, setNewGitHubUsername] = useState(bearer.github_username || '');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const [open, setOpen] = useState(false);
    const [deletionEMail, setDeletionEMail] = useState('');
    const history = useHistory();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
        setDeletionEMail('');
    };
    //

    useEffect(() => {
        if (errors) {
            setTimeout(() => {
                setErrors();
            }, 3000);
        }
    }, [currentGitHubUser, errors]);

    function handleToggleEditMode() {
        setEditMode(() => !editMode);
    }

    async function handleUpdateGitHub() {
        const res = await fetch(API + `users/${bearer.id}`, {
            method: "PATCH",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user: {
                    password: password,
                    github_username: newGitHubUsername
                }
            })
        })
        const data = await res.json();
        console.log(data)
        if (data.errors) {
            setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{data.errors}</Alert>)
            console.log(data.errors)
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
            const res = await fetch(API + `users/${bearer.id}`, {
                method: "DELETE",
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
            })
            const data = await res.json();
            if (data.errors) {
                setErrors(<Alert severity="error" variant="filled" style={{ width: "300px", margin: "0px auto" }}>{data.errors}</Alert>)
                setOpen(false)
                console.log(data.errors)
            } else {
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        } else if (deletionEMail !== bearer.email) {
            setErrors(<Alert severity="error" variant="filled" style={{ width: "500px", margin: "0px auto" }}>Please enter your email address to delete your account</Alert>)
            setOpen(false)
        }
    }

    return (
        <>
            <h3>Edit Profile:
                <Switch onChange={handleToggleEditMode} checked={editMode}></Switch>
            </h3>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">ACCOUNT INFORMATION</StyledTableCell>
                            <StyledTableCell align="center">USER PROFILE</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell align="center">
                                E-Mail Address
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {bearer.email}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">
                                Admin
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {bearer.admin ? "Full Access" : "No Admin Privileges"}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">
                                Github Account
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {editMode
                                    ? <>
                                        <TextField id="outlined-basic" label="GitHub Username" variant="outlined" value={newGitHubUsername} onChange={(e) => setNewGitHubUsername(e.target.value)} />
                                    </>
                                    : bearer.github_username || "No Account Listed"}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">
                                Account Created
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {new Date(bearer.created_at).toLocaleString()}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">
                                Account Updated
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {new Date(bearer.updated_at).toLocaleString()}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">
                                Auth Token
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {token}
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <br />
            {editMode
                ? <div style={{ textAlign: "center" }}>
                    <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={handleUpdateGitHub}>
                        Update Information
                    </Button>
                    <br /><br />
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                        Delete Account
                    </Button>
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
