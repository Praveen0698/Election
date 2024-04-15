import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";

const VotersList = () => {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  return (
    <div>
    <HeadDashboard
      navClick={navClick}
      setNavClick={setNavClick}
      side={side}
      setSide={setSide}
    />
    <div className="dashboard-page">
      <Sidebar navClick={navClick} side={side} />
      <div className="dashboard">
        <div className="paper-head-div">
          <p style={{ margin: "0", fontSize:"30px"  }}>Voters List</p>
          <div>
            <span>Voters Insights </span> <LiaGreaterThanSolid />{" "}
            <span style={{ color: "#f26522", }}>Voters List</span>
          </div>
        </div>
     
      </div>
    </div>
  </div>
  )
}

export default VotersList