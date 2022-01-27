import React from 'react';
import { Switch } from '@mui/material';
import { CreateAccountInformationTable } from './CreateAccountInformationTable';
import { CreateButtonsAndModalForAccountInformationEditMode } from './CreateButtonsAndModalForAccountInformationEditMode';

export function RenderEditAccountPage(handleToggleEditMode, editMode, bearer, newGitHubUsername, setNewGitHubUsername, token, password, setPassword, handleUpdateGitHub, handleClickOpen, open, handleClose, deletionEMail, setDeletionEMail, handleDeleteAccount, errors) {
    return <>
        <h3 className="subheading-sm" style={{ textAlign: 'left' }}>EDIT PROFILE:
            <Switch onChange={handleToggleEditMode} checked={editMode}></Switch>
        </h3>
        {CreateAccountInformationTable(bearer, editMode, newGitHubUsername, setNewGitHubUsername, token)}
        <br />
        <br />
        {CreateButtonsAndModalForAccountInformationEditMode(editMode, password, setPassword, handleUpdateGitHub, handleClickOpen, open, handleClose, deletionEMail, setDeletionEMail, handleDeleteAccount)}
        {errors}
    </>;
}
