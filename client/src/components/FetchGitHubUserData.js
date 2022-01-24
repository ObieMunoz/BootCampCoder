export function FetchGitHubUserData(github_username, setGitData) {
    fetch(`https://api.github.com/users/${github_username}`)
        .then(response => response.json())
        .then(data => {
            setGitData(data);
        });
}
