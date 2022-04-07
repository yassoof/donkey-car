import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="not-button nav-item"
      onClick={() => logout({ returnTo: window.sessionStorage.getItem("url") })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
