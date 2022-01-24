export function FetchGitHubRepositoryDataForUser(github_username, i, setGitRepos) {
    fetch(`https://api.github.com/users/${github_username}/repos?page=${i}&per_page=100`)
        .then(response => response.json())
        .then(data => {
            setGitRepos(prevState => [...prevState, ...data]);
        });
}
