import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const CenterNav = props => {
  CenterNav.propTypes = {
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.any])
  };

  const { isAuthenticated } = useAuth0();
  const path = "/donkey-car/test-cases";

  return isAuthenticated ? (
    <span className="centerbar">
      <NavLink
        className={
          [`${path}`].includes(props.path)
            ? "nav-item active"
            : "nav-item inactive"
        }
        to={path}
      >
        Test Cases
      </NavLink>
    </span>
  ) : null;
};

export default CenterNav;
