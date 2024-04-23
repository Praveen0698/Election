import React from "react";
import logo from "../assets/images/bjp-logo.png";
import { useNavigate } from "react-router-dom";

const HeadDashboard = ({ side, setSide, navClick, setNavClick }) => {
  const navigation = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Role");
    localStorage.removeItem("LName");
    localStorage.removeItem("FName");
    localStorage.removeItem("AuthToken");
    navigation("/");
  };
  return (
    <div>
      <div className="headDash">
        <div className="headDash-content">
          <div className="head-text" id="mobile-icons">
            <img className="mx-3" src={logo} height={55} alt="" />
            <div className="d-flex1">
              <button
                onClick={() => setNavClick(!navClick)}
                className="ham-icon"
              >
                <span className="hamburger-icon" onClick={() => setSide(!side)}>
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </span>
              </button>

              <a
                href="index.html"
                className="brand-icon d-flex align-items-center mx-2 mx-sm-3 text-primary"
              ></a>
              <button
                onClick={() => setSide(!side)}
                className="ham-icon"
                style={{ border: "2px solid red" }}
              >
                <span className="hamburger-icon" onClick={() => setSide(!side)}>
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </span>
              </button>
            </div>
          </div>
          <div className="head-icons mx-5">
            <button className="log-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadDashboard;
