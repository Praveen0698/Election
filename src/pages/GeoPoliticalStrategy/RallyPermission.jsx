import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import rallyPoster from "../../assets/images/Poster 1.png";
import { Button } from "@mui/material";

export default function RallyPermission() {
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
              <p style={{ margin: "0" }}>Rally Permission</p>
              <div>
                <span>Geo-Political Strategy</span> <LiaGreaterThanSolid />{" "}
                <span style={{ color: "#f26522" }}>Rally Permission</span>
              </div>
            </div>
            <div className="paper-img-div">
              <div className="rallyPermission-bg">
                <div className="rallyPoster">
                  <div className="rallyImg">
                    <img src={rallyPoster} alt="" />
                  </div>
                  <a
                    href="https://eabedan-cpbbsrctc.odisha.gov.in/Rally/RallyInstruction"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      id="rallyButton"
                      className="submit"
                      type="submit"
                      variant="outlined"
                    >
                      Visit Site
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
