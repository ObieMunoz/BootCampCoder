import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateErrorModals } from '../errors/CreateErrorModals';
import { DetectErrors } from '../errors/DetectErrors';
import { FetchDELETEUser } from '../requests/FetchDELETEUser';
import { FetchPATCHUser } from '../requests/FetchPATCHUser';
import useToken from '../useToken';
import { RenderEditAccountPage } from './RenderEditAccountPage';

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

    const handleClose = () => {
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
            HandleDeletionResponse(res, data);
        } else CreateErrorIfEMailMismatch();
    }

    return (
        RenderEditAccountPage(handleToggleEditMode,
            editMode,
            bearer,
            newGitHubUsername,
            setNewGitHubUsername,
            token,
            password,
            setPassword,
            handleUpdateGitHub,
            handleClickOpen,
            open,
            handleClose,
            deletionEMail,
            setDeletionEMail,
            handleDeleteAccount,
            errors)
    )

    function HandleDeletionResponse(res, data) {
        if (res.status !== 200)
            CreateErrorModalAndClose(data);
        else
            RemoveTokenAndPushUserToRoot();
    }

    function CreateErrorModalAndClose(data) {
        CreateErrorModals(setErrors, data);
        setOpen(false);
    }

    function RemoveTokenAndPushUserToRoot() {
        sessionStorage.removeItem('token');
        history.push('/');
        window.location.reload();
    }

    function CreateErrorIfEMailMismatch() {
        if (deletionEMail !== bearer.email) {
            CreateErrorModals(setErrors, ['Please enter your email address to delete your account.']);
            setOpen(false);
        }
    }
}

export default WhoAmI