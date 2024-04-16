import React, { useState } from "react";
import dashboard from "../assets/dashboard.png";
import post from "../assets/post.png";
import voter from "../assets/voter.png";
import areas from "../assets/images/Areas.png";
import video from "../assets/video-marketing.png";
import volunteer from '../assets/images/Volunteer.png'
import social from "../assets/social-media.png";
import campaign from "../assets/images/megaphone 1.png";
import sms from "../assets/images/SMS.png";
import email from "../assets/images/Email.png";
import chat from "../assets/chat.png";
import credit from "../assets/credit-card.png";
import data from "../assets/data.png";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = ({ side, navClick }) => {
  const [smsOpen, setSmsOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [geoOpen, setGeOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  const [voterOpen, setVoterOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);

  const navigation = useNavigate();
  const toggleMedia = () => {
    setMediaOpen(!mediaOpen);
  };
  const toggleArea = () => {
    setAreaOpen(!areaOpen);
  };

  const toggleGeo = () => {
    setGeOpen(!geoOpen);
  };

  const toggleSms = () => {
    setSmsOpen(!smsOpen);
  };

  const toggleVoters = () => {
    setVoterOpen(!voterOpen);
  };

  const toggleEmail = () => {
    setEmailOpen(!emailOpen);
  };

  const toggleNotice = () => {
    setNoticeOpen(!noticeOpen);
  };

  return (
    <div
      className="sidebar"
      style={{
        zIndex:"100",
        position: "relative",
        left:
          window.innerWidth < 1200 ? (side ? "" : "-400px") : side ? "" : "",
        borderRight: navClick ? "2px solid #adb5bd" : "",
        width: navClick ? "100px" : "",
        marginLeft: navClick ? "-20px" : "",
        overflowX: navClick ? "hidden" : "",
        overflowY: navClick ? "hidden" : "",
        marginTop: navClick ? "-10px" : "",
      }}
    >
      <ul style={{ listStyle: "none" }}>
        <li className="sidebar-list" onClick={() => navigation("/dashboard")}>
          <div className="sidebar-content">
            <img
              src={dashboard}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Dashboard
          </div>
        </li>
        <li className="sidebar-list" onClick={toggleArea}>
          <div className="sidebar-content">
            <img
              src={areas}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Area
            <span className="ms-auto text-end">
              {areaOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </li>
        {areaOpen && (
          <div className="submodule">
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/area/image-area")}
            >
              Image Area Mark
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/area/districts")}
            >
              All Districts
            </p>
          </div>
        )}

        <li className="sidebar-list" onClick={() => navigation("/volunteers")}>
          <div className="sidebar-content">
            <img
              src={volunteer}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Volunteers
          </div>
        </li>

        <li className="sidebar-list" onClick={toggleVoters}>
          <div className="sidebar-content">
            <img
              src={voter}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Voter Database
            <span className="ms-auto text-end">
              {voterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </li>
        {voterOpen && (
          <div className="submodule">
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/voters/voter-list")}
            >
              Voters List
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/voters/voter-verification")}
            >
              Voter's Category
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/voters/voter-database")}
            >
              Import Voter
            </p>
          </div>
        )}
        <li className="sidebar-list" onClick={toggleMedia}>
          <div className="sidebar-content">
            <img
              src={post}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Media Summary
            <span className="ms-auto text-end">
              {mediaOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </li>
        {mediaOpen && (
          <div className="submodule">
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/media/paper-media")}
            >
              Paper Media Summary
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/media/electronic-media")}
            >
              Electronic Media Summary
            </p>
          </div>
        )}

        <li
          className="sidebar-list"
          onClick={() => navigation("/campaign-analysis")}
        >
          <div className="sidebar-content">
            <img
              src={campaign}
              alt=""
              style={{
                height: navClick ? "40px" : "",
                width: navClick ? "40px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Campaign Analysis
          </div>
        </li>
        {/* <li className="sidebar-list" onClick={toggleSms}>
          <div className="sidebar-content">
            <img
              src={voter}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Bulk SMS
            <span className="ms-auto text-end">
              {smsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </li>
        {smsOpen && (
          <div className="submodule">
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/voters/voter-list")}
            >
              Write Message
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/voters/voter-verification")}
            >
              Sent Message
            </p>
          </div>
        )} */}
        <li
          className="sidebar-list"
          onClick={() => navigation("/bulk-sms/write-sms")}
        >
          <div className="sidebar-content">
            <img
              src={sms}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Bulk SMS
          </div>
        </li>
        <li
          className="sidebar-list"
          onClick={() => navigation("/email/write-email")}
        >
          <div className="sidebar-content">
            <img
              src={email}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Email
          </div>
        </li>

        {/* <li className="sidebar-list" onClick={toggleEmail}>
          <div className="sidebar-content">
            <img
              src={voter}
              alt=""
              style={{
                height: navClick ? "35px" : "",
                width: navClick ? "35px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Email
            <span className="ms-auto text-end">
              {emailOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </li>
        {emailOpen && (
          <div className="submodule">
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/voters/voter-list")}
            >
              Write Email
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/voters/voter-verification")}
            >
              Sent Email
            </p>
          </div>
        )} */}

        <li className="sidebar-list">
          <div className="sidebar-content" onClick={toggleGeo}>
            <img
              src={data}
              alt=""
              style={{
                height: navClick ? "40px" : "",
                width: navClick ? "40px" : "",
                marginLeft: navClick ? "42px" : "",
                paddingRight: navClick ? "10px" : "",
              }}
            />
            Geo-Political Strategy
            <span className="ms-auto text-end">
              {geoOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </li>
        {geoOpen && (
          <div className="submodule">
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/geological/rally-permission")}
            >
              Rally Permission
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/geological/policy-intiatives")}
            >
              Policy Intiatives
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/geological/past-election-results")}
            >
              Past Election Result
            </p>
            <p
              className="sidebar-submodule-p"
              onClick={() => navigation("/geological/population-insights")}
            >
              Population Insights
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
