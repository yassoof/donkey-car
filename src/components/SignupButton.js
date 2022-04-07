import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="not-button nav-item"
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
