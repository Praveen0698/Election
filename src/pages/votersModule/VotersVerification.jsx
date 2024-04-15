
import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import Button from "react-bootstrap/Button";

const VotersVerification = () => {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);

  const labels = [
    'District',
    'RLN Name V1',
    'Epic Number',
    'Additional-Check',
    'RLN Name V2',
    'Gender',
    'Multiple',
    'RLN Name V3',
    'State',
    'Last Update',
    'Section Number',
    'Name',
    'Assembly Constituency',
    'Name V1',
    'Relation Name',
    'Assembly Constituency No',
    'Name V2',
    'Relation Type',
    'Polling Station',
    'Name V3',
    'House Number',
    'Part Number',
    'Parliamentary Name',
    'Age',
    'Serial Number Impart',
    'Parliamentary Constituency',
    'Area',
    'Location',
    'ID'
  ];

  const dummyData = {
    'District': 'Dummy District',
    'RLN Name V1': 'Dummy RLN Name V1',
    'Epic Number': 'Dummy Epic Number',
    'Additional-Check': 'Dummy Additional-Check',
    'RLN Name V2': 'Dummy RLN Name V2',
    'Gender': 'Dummy Gender',
    'Multiple': 'Dummy Multiple',
    'RLN Name V3': 'Dummy RLN Name V3',
    'State': 'Dummy State',
    'Last Update': 'Dummy Last Update',
    'Section Number': 'Dummy Section Number',
    'Name': 'Dummy Name',
    'Assembly Constituency': 'Dummy Assembly Constituency',
    'Name V1': 'Dummy Name V1',
    'Relation Name': 'Dummy Relation Name',
    'Assembly Constituency No': 'Dummy Assembly Constituency No',
    'Name V2': 'Dummy Name V2',
    'Relation Type': 'Dummy Relation Type',
    'Polling Station': 'Dummy Polling Station',
    'Name V3': 'Dummy Name V3',
    'House Number': 'Dummy House Number',
    'Part Number': 'Dummy Part Number',
    'Parliamentary Name': 'Dummy Parliamentary Name',
    'Age':'45',
    'Serial Number Impart' :'7845',
    'Parliamentary Constituency':'PQ Constituency',
    'Area':'Swampatna',
    'Location':'40.7128 N, 74.0060 W',
    'ID':'ID123456'
  };

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
            <p style={{ margin: "0", fontSize: "30px" }}>Voter Verification</p>
            <div>
              <span>Voters Insights </span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>Voter Verification</span>
            </div>
          </div>
          <div className="form-div">
            <div className="form-div-1">
              <label>Voter ID</label>
              <div className="form-div-2">
                <div className="search-print">
                  <input
                    type="text"
                    className="search-beside-btn"
                    placeholder="Search"
                    style={{
                      width: "23rem",
                      borderRadius: "2px",
                      height: "45px",
                      padding: "10px",
                      border: "1px solid rgba(247, 108, 36, 1)",
                    }}
                  />
                  <button className="new-btn">Search</button>
                </div>

                <div>
                  <button className="new-btn-print">Print</button>
                </div>
              </div>
            </div>
            <hr className="hr-style" />

            <div className="form-div-content">
              <div className="form-column-row">
                <label>Client ID</label>
                <h5>ABCD</h5>
              </div>

              {labels.map(label => (
                <div key={label} className="form-column-row">
                  <label>{label}:</label>
                  <h5>{dummyData[label]}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotersVerification;

