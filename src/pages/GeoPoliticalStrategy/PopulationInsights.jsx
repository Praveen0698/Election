import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { Button } from "@mui/material";
import InsightsImg from "../../assets/images/Group 1000002770.png";

export default function PopulationInsights() {
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
              <p style={{ margin: "0" }}>Population Insights</p>
              <div>
                <span>Geo-Political Strategy</span> <LiaGreaterThanSolid />{" "}
                <span style={{ color: "#f26522" }}>Population Insights</span>
              </div>
            </div>
            <div className="paper-img-div">
              <div className="rallyPermission-bg">
                <div className="rallyPoster">
                  <div className="rallyImg">
                    <img src={InsightsImg} alt="" />
                  </div>
                  <a
                    href="https://www.citypopulation.de/en/india/odisha/"
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
