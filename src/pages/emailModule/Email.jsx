import React, { useState, useEffect } from "react";
import HeadDashboard from "../../components/HeadDashboard";
import Sidebar from "../../components/Sidebar";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { TextField, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

const Email = () => {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    subject: "",
    body: "",
    attachments: [],
  });

  const handleAttachmentChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setAttachments([...attachments, ...fileArray]);
  };

  const handleDeleteAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      attachments: attachments
    })
  }, [attachments])
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log("formDta", formData);
  console.log("att", attachments);
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
            <p style={{ margin: "0" }}>Write Email</p>
            <div>
              <span>Email</span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>Write Email</span>
            </div>
          </div>
          <div className="paper-img-div" style={{ display: "flex" }}>
            <form onSubmit="handleSubmit(event)" class="email-form">
              <div className="email-content-container">
                <div className="emailHeader">New Message</div>
                <div className="email-content">
                  <TextField
                    id="standard-search"
                    label="To"
                    className="email-field"
                    type="email"
                    variant="standard"
                    name="to"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <TextField
                    id="standard-search"
                    label="Cc"
                    className="email-field"
                    type="text"
                    variant="standard"
                    name="cc"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <TextField
                    id="standard-search"
                    label="Subject"
                    className="email-field mb-4"
                    type="text"
                    variant="standard"
                    name="subject"
                    onChange={(e) => handleInputChange(e)}
                  />

                  <TextField
                    fullWidth
                    label="Body"
                    id="fullWidth"
                    className="email-field"
                    multiline
                    maxRows={4}
                    rows={10}
                    name="body"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="email-content">
                  {attachments.map((attachment, index) => (
                    <div key={index}>
                      {attachment.name}
                      <CloseIcon
                        onClick={() => handleDeleteAttachment(index)}
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="email-button">
                  <button type="submit" className="email-btn">
                    Submit
                  </button>
                  <input
                    type="file"
                    id="attachment"
                    className="visually-hidden"
                    multiple
                    // onChange={}
                    name="attachments"
                    onChange={(e) => {
                      handleInputChange(e);
                      handleAttachmentChange(e);
                    }}
                  />
                  <label htmlFor="attachment">
                    <AttachFileIcon
                      style={{ marginLeft: "20px", cursor: "pointer" }}
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
