import React from "react";
import logo from "../assets/images/bjp-logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <img className="mx-3" src={logo} height={55} alt="" />
      </div>
    </div>
  );
};

export default Header;
