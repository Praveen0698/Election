import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { paperData } from "./Data";

const Paper = () => {
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
            <p style={{ margin: "0" }}>Paper Media Summary</p>
            <div>
              <span>Media Summary</span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>Paper Media Summary</span>
            </div>
          </div>
          <div className="paper-img-div">
            {paperData.map((item, index) => (
              <div key={index} className="paper-single-div">
              <a href={item.link} target="_blank"> <img src={item.img} alt="newspaper"  /></a>
               
               

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paper;
