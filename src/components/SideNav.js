import CenterNav from "./CenterNav";
import "./css/SideNav.css";
import React from "react";
import PropTypes from "prop-types";

const SideNav = props => {
  SideNav.propTypes = {
    showSNav: PropTypes.bool.isRequired,
    setShowSNav: PropTypes.func.isRequired
  };

  return (
    <div
      className="sidenav"
      style={
        props.showSNav ? { minWidth: "10em", width: "18vw" } : { width: "0px" }
      }
    >
      <button
        className="closebutton not-button nav-item"
        onClick={() => {
          props.setShowSNav();
        }}
      >
        {" "}
        &times;{" "}
      </button>
      <CenterNav />
    </div>
  );
};

export default SideNav;
