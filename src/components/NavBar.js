import "./css/NavBar.css";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import CenterNav from "./CenterNav";
import { useState, useEffect } from "react";
import React from "react";

const NavBar = (props) => {
  const [path, setPath] = useState(window.location.pathname);
  let tempPath = "";

  function pathHandler() {
    tempPath = window.location.pathname;
    if (tempPath.endsWith("/"))
      tempPath = tempPath.slice(0, tempPath.length - 1);
    if (path !== tempPath) setPath(tempPath);
  }

  useEffect(() => {
    pathHandler();
  }, []);

  return (
    <div className="topnav" onClick={() => pathHandler()}>
      <LeftNav batonpass={props} path={path} />
      <CenterNav path={path} />
      <RightNav />
    </div>
  );
};

export default NavBar;
