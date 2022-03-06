import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <a onClick={() => logout({ returnTo: "https://yassoof.github.io/donkey-car" })} >
            Log Out
        </a>
    );
};

export default LogoutButton;