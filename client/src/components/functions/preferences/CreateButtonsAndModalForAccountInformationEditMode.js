import React from 'react';
import { CreateAccountDeletionModal } from './CreateAccountDeletionModal';
import { CreatePasswordFieldAndUpdateDeleteButtons } from './CreatePasswordFieldAndUpdateDeleteButtons';

export function CreateButtonsAndModalForAccountInformationEditMode(editMode, password, setPassword, handleUpdateGitHub, handleClickOpen, open, handleClose, deletionEMail, setDeletionEMail, handleDeleteAccount) {
    return RenderPasswordFieldButtonsAndModalIfEditMode();

    function RenderPasswordFieldButtonsAndModalIfEditMode() {
        return <>
            {editMode
                ? CreatePasswordFieldButtonsAndModal()
                : null}
            <br />
        </>;
    }

    function CreatePasswordFieldButtonsAndModal() {
        return <div style={{ textAlign: "center" }}>
            {CreatePasswordFieldAndUpdateDeleteButtons(password, setPassword, handleUpdateGitHub, handleClickOpen)}
            {CreateAccountDeletionModal(open, handleClose, deletionEMail, setDeletionEMail, handleDeleteAccount)}
        </div>;
    }
}


