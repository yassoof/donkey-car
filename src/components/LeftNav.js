import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/DonkeyCarImage.png";
import React from "react";
import Proptypes from "prop-types";

const LeftNav = props => {
  LeftNav.propTypes = {
    path: Proptypes.string.isRequired,
    batonpass: Proptypes.shape({
      showSNav: Proptypes.bool.isRequired,
      setShowSNav: Proptypes.func.isRequired
    }).isRequired
  };
  const path = "/donkey-car";

  return (
    <span className="leftbar">
      <button
        className="icon not-button nav-item"
        style={
          props.batonpass.showSNav
            ? { color: "black", backgroundColor: "#ddd" }
            : null
        }
        onClick={() => {
          props.batonpass.setShowSNav();
        }}
      >
        <FaBars />
      </button>
      <img className="navlogo" src={logo} alt="navbar logo" />
      <NavLink
        className={
          [`${path}`].includes(props.path)
            ? "nav-item active"
            : "nav-item inactive"
        }
        to={path}
      >
        Home
      </NavLink>
    </span>
  );
};

export default LeftNav;
