import React, { useEffect, useState } from 'react';
import useToken from '../App/useToken';
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
        const res = await fetch(`http://localhost:3000/users/${bearer.id}`, {
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
                </div>
                : null}
            <br />
            {errors}
        </>
    )
}

export default WhoAmI
