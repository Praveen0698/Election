import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import pastElection from "../../assets/images/india-votes 1.png";
import pastVotes from "../../assets/images/Group 1000002771.png";
import { Button } from "@mui/material";

export default function PastElectionResults() {
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
          <Sidebar navClick={navClick} side={side} />{" "}
          <div className="dashboard">
            <div className="paper-head-div">
              <p style={{ margin: "0" }}>Past Election Results</p>
              <div>
                <span>Geo-Political Strategy</span> <LiaGreaterThanSolid />{" "}
                <span style={{ color: "#f26522" }}>Past Election Results</span>
              </div>
            </div>
            <div className="paper-img-div">
              <div className="rallyPermission-bg">
                <div className="rallyPoster">
                  <div className="pastResult">
                    <div className="policyImg my-3">
                      <img src={pastElection} alt="" />
                      <img src={pastVotes} alt="" />
                    </div>
                  </div>
                  <a
                    href="https://www.indiavotes.com/lok-sabha/2019/orissa/17/6"
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
