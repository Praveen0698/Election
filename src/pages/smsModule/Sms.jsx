import React, { useState } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { TextField, Button } from "@mui/material";

const Sms = () => {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const [emailContent, setEmailContent] = useState("");

  const handleTextareaChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform actions like sending the email with the content
    console.log("Email content:", emailContent);
    // Reset the textarea after submission if needed
    setEmailContent("");
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
            <p style={{ margin: "0" }}>Write Sms</p>
            <div>
              <span>SMS</span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>Write Sms</span>
            </div>
          </div>
          <div className="paper-img-div" style={{ display: "flex" }}>
            <form onSubmit="handleSubmit(event)" class="email-form">
              <div class="email-content-container">
                <textarea id="email-content" class="email-content"></textarea>
                <label for="email-content" class="email-placeholder">
                  Write your sms here...
                </label>
              </div>
              <button type="submit" class="email-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sms;
