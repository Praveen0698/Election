import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeadDashboard from "../components/HeadDashboard";

import "../Map.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";

const Dashboard = () => {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [events, setEvents] = useState([]); // Define events state

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setModalIsOpen(true);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalIsOpen(true);
  };

  const handleInputChange = (event) => {
    setNewEventTitle(event.target.value);
  };
  console.log("adta", newEventTitle);
  const handleEventCreate = () => {
    // Implement logic to create or update event
    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDayRender = (info) => {
    info.el.style.color = "orange";
  };

  const handleViewRender = (info) => {
    const dayHeaderCells = document.querySelectorAll(".fc-day-header");
    dayHeaderCells.forEach((cell) => {
      const dayOfWeek = cell.getAttribute("data-date");
      if (["2022-01-03", "2022-01-04"].includes(dayOfWeek)) {
        cell.style.backgroundColor = "gray";
      }
    });
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
            <div className="dash-cont">
              <p className="dash-cont-p">Voter</p>
              <div className="dash-cont-child">
                <span className="dash-cont-span">1</span>
                <p className="dash-cont-child-p">Voter</p>
              </div>
            </div>
            <div className="dash-cont">
              <p className="dash-cont-p">Volunteer</p>
              <div className="dash-cont-child">
                <span className="dash-cont-span">1</span>
                <p className="dash-cont-child-p">Volunteer</p>
              </div>
            </div>
            <div className="dash-cont">
              <p className="dash-cont-p">Event</p>
              <div className="dash-cont-child">
                <span>1</span>
                <p>Event</p>
              </div>
            </div>
            <div className="dash-cont">
              <p className="dash-cont-p">Areas</p>
              <div className="dash-cont-child">
                <span className="dash-cont-span">1</span>
                <p className="dash-cont-child-p">Areas</p>
              </div>
            </div>
          </div>
          <div className="paper-head-div">
            <div className="col-xl-9 col-lg-12 col-md-12">
              <div
                id="card"
                className="card"
                style={{
                  height: "80vh",
                  padding: "20px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <FullCalendar
                    className="calendar-data-field"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    header={{
                      left: "title",
                      center: "",
                      right:
                        "dayGridMonth, dayGridWeek, dayGridDay, prev, next",
                    }}
                    editable={true}
                    eventLimit={true}
                    selectable={true}
                    events={events} // Pass events state to FullCalendar
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    height={520}
                    dayRender={handleDayRender}
                    viewRender={handleViewRender}
                  />
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Event Modal"
                    style={{
                      content: {
                        width: "50%",
                        height: "30%",
                        margin: "auto",
                      },
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                      },
                    }}
                  >
                    <h2>{selectedEvent ? "Edit Event" : "Create New Event"}</h2>
                    {selectedDate && <p>Selected Date: {selectedDate}</p>}
                    <form onSubmit={handleEventCreate}>
                      <label>
                        Event Title:
                        <input
                          type="text"
                          value={newEventTitle}
                          onChange={handleInputChange}
                          className="event-input"
                        />
                      </label>
                      <div className="data-buttons">
                        <button
                          onClick={handleEventCreate}
                          id="input-btn-submit"
                        >
                          {selectedEvent ? "Update Event" : "Create Event"}
                        </button>
                        <button onClick={closeModal} id="input-btn-cancel">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-12 col-md-12"
              style={{ marginLeft: "20px" }}
            >
              <div id="card" className="card" style={{ height: "80vh" }}>
                <div id="card-header" className="card-header">
                  <h3 className="card-title">EVENT LIST</h3>
                </div>
                {events.map((event, index) => (
                  <div className="event-list" key={index}>
                    <p
                      style={{
                        background:
                          event.className === "added-holiday-data"
                            ? "#501a51"
                            : "#f2711c",
                      }}
                    >
                      {event.title} {event.start}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
