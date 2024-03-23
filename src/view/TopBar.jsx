import React from "react";

const TopBar = ({ children }) => (
  <div className="top-bar">
    <h1>{children}</h1>
    <img className="logo" src="icons/logo.svg" alt="logo" />
  </div>
);

export default TopBar;
