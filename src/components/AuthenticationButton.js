import SignupButton from "./SignupButton";
import LogoutButton from "./LogoutButton";
import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <SignupButton />;
};

export default AuthenticationButton;
