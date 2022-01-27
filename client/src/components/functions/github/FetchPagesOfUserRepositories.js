import { useEffect } from 'react';
import { FetchGETGitHubRepositoryDataForUser } from '../requests/FetchGETGitHubRepositoryDataForUser';

export function FetchPagesOfUserRepositories(gitData, github_username, setGitRepos) {
    useEffect(() => {
        if (gitData) {
            for (let i = 1; i <= Math.ceil(gitData.public_repos / 100); i++) {
                if (i > 5) {
                    console.warn('Due to API rate limitations, only the first 500 repositories are scanned.');
                    break;
                } else {
                    FetchGETGitHubRepositoryDataForUser(github_username, i, setGitRepos);
                }
            }
        }
    }, [gitData, github_username, setGitRepos]);
}
