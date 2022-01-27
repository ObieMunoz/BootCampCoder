import React from 'react';
import TableBody from '@mui/material/TableBody';
import { CreateTableRowAccountInformationAuthToken } from './CreateTableRowAccountInformationAuthToken';
import { CreateTableRowAccountInformationAccountTimestamps } from './CreateTableRowAccountInformationAccountTimestamps';
import { CreateTableRowAccountInformationGitHubEditable } from './CreateTableRowAccountInformationGitHubEditable';
import { CreateTableRowAccountInformationAdminStatus } from './CreateTableRowAccountInformationAdminStatus';
import { CreateTableRowAccountInformationEMail } from './CreateTableRowAccountInformationEMail';

export function CreateTableBodyAccountInformation(bearer, editMode, newGitHubUsername, setNewGitHubUsername, token) {
    return RenderTableBodyAccountInformation();

    function RenderTableBodyAccountInformation() {
        return <TableBody>
            {CreateTableRowAccountInformationEMail(bearer)}
            {CreateTableRowAccountInformationAdminStatus(bearer)}
            {CreateTableRowAccountInformationGitHubEditable(editMode, newGitHubUsername, setNewGitHubUsername, bearer)}
            {CreateTableRowAccountInformationAccountTimestamps(bearer)}
            {CreateTableRowAccountInformationAuthToken(token)}
        </TableBody>;
    }
}