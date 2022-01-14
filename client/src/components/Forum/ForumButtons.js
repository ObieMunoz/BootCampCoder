import React from 'react'
import Button from "@mui/material/Button"
import Stack from '@mui/material/Stack';
import './ForumButtons.css'

function ForumButtons() {
    return (
        <div>
            <Stack spacing={10} direction="row" textAlign="center" justifyContent="center">
                <Button className="forum-buttons" variant="contained" color="secondary">
                    Create Question
                </Button>
                <Button className="forum-buttons" variant="contained" color="secondary">
                    Refresh Board
                </Button>
            </Stack>
        </div>
    )
}

export default ForumButtons
