import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })} >
            Sign Up
        </a>
    );
};

export default SignupButton;