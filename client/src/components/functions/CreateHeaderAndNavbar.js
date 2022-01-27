import { Stack } from '@mui/material';
import Button from "@mui/material/Button";
import React from 'react';
import { Link } from 'react-router-dom';

export function CreateHeaderAndNavbar(isSmallScreen, logout) {
    return <header>
        <h1 className="mainheading">BOOTCAMPCODER</h1>
        <Stack spacing={isSmallScreen ? 1 : 3} direction={isSmallScreen ? 'column' : 'row'} textAlign="center" justifyContent="center">
            <Link to="/" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" style={isSmallScreen ? { width: '90vw' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
                Dashboard
            </Button></Link>
            <Link to="/assistant" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" style={isSmallScreen ? { width: '90vw' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
                GitHub Assistant
            </Button></Link>
            <Link to="/preferences" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" style={isSmallScreen ? { width: '90vw' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
                Preferences
            </Button></Link>
            <Button className="forum-buttons" onClick={() => logout()} variant="contained" color="primary" style={isSmallScreen ? { width: '90vw', margin: '8px auto' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
                Logout
            </Button>
        </Stack>
    </header>;
}
