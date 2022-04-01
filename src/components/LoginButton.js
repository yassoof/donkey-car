import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? null : (
        <button className='not-button nav-item'
            onClick={() => loginWithRedirect({ redirect_uri: window.sessionStorage.getItem('url') })} >
            Log In
        </button>
    );
};

export default LoginButton;