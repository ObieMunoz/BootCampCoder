import React from 'react';
import TableBody from '@mui/material/TableBody';
import { AddTableRowGitHubAvatarAndUsername } from './AddTableRowGitHubAvatarAndUsername';
import { AddTableRowGitHubLinkedTwitter } from './AddTableRowGitHubLinkedTwitter';
import { AddTableRowGitHubProfileLink } from './AddTableRowGitHubProfileLink';
import { AddTableRowGitHubBiographyInformation } from './AddTableRowGitHubBiographyInformation';
import { AddTableRowGitHubEMailInformation } from './AddTableRowGitHubEMailInformation';
import { AddTableRowGitHubLocationInformation } from './AddTableRowGitHubLocationInformation';
import { AddTableRowGitHubBlogInformation } from './AddTableRowGitHubBlogInformation';
import { AddTableRowGitHubCompanyInformation } from './AddTableRowGitHubCompanyInformation';
import { AddTableRowGitHubHireableBoolean } from './AddTableRowGitHubHireableBoolean';
import { AddTableRowGitHubActivePagesDeploymentCount } from './AddTableRowGitHubActivePagesDeploymentCount';
import { AddTableRowGitHubFollowingCount } from './AddTableRowGitHubFollowingCount';
import { AddTableRowGitHubFollowersCount } from './AddTableRowGitHubFollowersCount';
import { AddTableRowGitHubPublicRepositoryCount } from './AddTableRowGitHubPublicRepositoryCount';

export function CreateBodyForGitHubTable(gitData, gitRepoList) {
    return RenderTableBody();

    function RenderTableBody() {
        return <TableBody>
            {AddTableRowGitHubAvatarAndUsername(gitData)}
            {AddTableRowGitHubLinkedTwitter(gitData)}
            {AddTableRowGitHubPublicRepositoryCount(gitData)}
            {AddTableRowGitHubFollowersCount(gitData)}
            {AddTableRowGitHubFollowingCount(gitData)}
            {AddTableRowGitHubActivePagesDeploymentCount(gitData, gitRepoList)}
            {AddTableRowGitHubHireableBoolean(gitData)}
            {AddTableRowGitHubCompanyInformation(gitData)}
            {AddTableRowGitHubBlogInformation(gitData)}
            {AddTableRowGitHubLocationInformation(gitData)}
            {AddTableRowGitHubEMailInformation(gitData)}
            {AddTableRowGitHubBiographyInformation(gitData)}
            {AddTableRowGitHubProfileLink(gitData)}
        </TableBody>;
    }
}