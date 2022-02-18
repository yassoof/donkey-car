import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? null : (
        <a onClick={() => loginWithRedirect()} >
            Log In
        </a>
    );
};

export default LoginButton;