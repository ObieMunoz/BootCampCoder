import React from 'react'
import Button from "@mui/material/Button"
import Stack from '@mui/material/Stack';
import './ForumButtons.css'
import { useHistory } from 'react-router-dom';

function ForumButtons() {
    const history = useHistory();

    return (
        <div>
            <Stack spacing={10} direction="row" textAlign="center" justifyContent="center">
                <Button className="forum-buttons" variant="contained" color="secondary" onClick={() => history.push('/questions/new')}>
                    Create Question
                </Button>
                {/* <Button className="forum-buttons" variant="contained" color="secondary">
                    Refresh Board
                </Button> */}
            </Stack>
        </div>
    )
}

export default ForumButtons
