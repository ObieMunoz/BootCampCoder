import useToken from '../App/useToken';

function WhoAmI() {
    const { token, bearer } = useToken();

    return (
        <>
            <h2>Who Am I?</h2>
            <p>E-Mail: {bearer.email}</p>
            <p>Admin: {bearer.admin ? "Full Access" : "No Admin Privileges"}</p>
            <p>Github Account: {bearer.github_username || "No Account Listed"}</p>
            <p>Account Created: {bearer.created_at}</p>
            <p>Account Updated: {bearer.updated_at}</p>
            <p>Auth Token: {token}</p>
        </>
    )
}

export default WhoAmI
