import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import policyImg from "../../assets/images/logo 1.png";
import { Button } from "@mui/material";

export default function PolicyIniatives() {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  return (
    <div>
      <div>
        <HeadDashboard
          navClick={navClick}
          setNavClick={setNavClick}
          side={side}
          setSide={setSide}
        />
        <div className="dashboard-page">
          {<Sidebar navClick={navClick} side={side} />}
          <div className="dashboard">
            <div className="paper-head-div">
              <p style={{ margin: "0" }}>Policy Intiatives</p>
              <div>
                <span>Geo-Political Strategy</span> <LiaGreaterThanSolid />{" "}
                <span style={{ color: "#f26522" }}>Policy Intiatives</span>
              </div>
            </div>
            <div className="paper-img-div">
              <div className="rallyPermission-bg">
                <div className="rallyPoster">
                  <div className="policyPoster">
                    <div className="policyImg my-3">
                      <img src={policyImg} alt="" />
                    </div>
                  </div>
                  <a
                    href="https://web.umang.gov.in/landing/scheme/dashboard"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      id="rallyButton"
                      className="submit"
                      type="submit"
                      variant="outlined"
                    >
                      Visit
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
