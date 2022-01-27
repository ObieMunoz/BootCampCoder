import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToken from './functions/useToken';
import { FetchPATCHUser } from './functions/requests/FetchPATCHUser';
import { FetchDELETEUser } from './functions/requests/FetchDELETEUser';
import { DetectErrors } from './functions/errors/DetectErrors';
import { CreateErrorModals } from './functions/errors/CreateErrorModals';
import { RenderEditAccountPage } from './functions/preferences/RenderEditAccountPage';

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
}

export default WhoAmI




