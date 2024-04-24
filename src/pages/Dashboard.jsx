import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import HeadDashboard from "../components/HeadDashboard";
import axios from "axios";
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
  const [selectedPlace, setSelectedPlace] = useState("");
  const [updateDate, setUpdateDate] = useState();
  const [events, setEvents] = useState([]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    const dateString = info.event._instance.range.start;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setUpdateDate(formattedDate);
    setModalIsOpen(true);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalIsOpen(true);
  };

  const [formData, setFormData] = useState({
    date: "",
    title: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      date: selectedDate,
    });
    setSelectedPlace(e.target.value);
  };

  const handleEventCreate = () => {};
  const handleEventSave = async () => {
    if (selectedEvent) {
      await axios.put(
        `http://13.201.88.48:6060/events/${selectedEvent._def.extendedProps.eventId}`,
        { title: selectedPlace, date: updateDate }
      );
    } else {
      await axios.post("http://13.201.88.48:6060/events", formData);
    }
    setModalIsOpen(false);
  };

  const getEvent = async () => {
    try {
      const res = await axios.get("http://13.201.88.48:6060/events");
      const filteredEvents = res.data.filter((event) => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return eventDate >= currentDate;
      });
      setEvents(filteredEvents);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    await axios.delete(
      `http://13.201.88.48:6060/events/${selectedEvent._def.extendedProps.eventId}`
    );
    setModalIsOpen(false);
    // getEvent();
  };

  const [getVolunterr, setGetVolunteer] = useState([]);
  const handleVolunteer = async () => {
    await axios
      .get("http://13.201.88.48:6060/volunteers/get/volunteers")
      .then((res) => setGetVolunteer(res.data))
      .catch((err) => console.error(err));
  };

  const [Voter, setVoter] = useState([]);

  const getVoter = async () => {
    await axios
      .get("http://13.201.88.48:6060/voterdatabase/get/voterdatabase")
      .then((res) => {
        setVoter(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleVolunteer();
    getEvent();
    getVoter();
  }, []);

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
                <span className="dash-cont-span">{Voter.length}</span>
                <p className="dash-cont-child-p">Voter</p>
              </div>
            </div>
            <div className="dash-cont">
              <p className="dash-cont-p">Volunteer</p>
              <div className="dash-cont-child">
                <span className="dash-cont-span">{getVolunterr.length}</span>
                <p className="dash-cont-child-p">Volunteer</p>
              </div>
            </div>
            <div className="dash-cont">
              <p className="dash-cont-p">Event</p>
              <div className="dash-cont-child">
                <span>{events.length}</span>
                <p>Event</p>
              </div>
            </div>
            <div className="dash-cont">
              <p className="dash-cont-p">Areas</p>
              <div className="dash-cont-child">
                <span className="dash-cont-span">13</span>
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
                    events={events}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    height={500}
                  />
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Event Modal"
                    style={{
                      content: {
                        width: "30%",
                        height: "36%",
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
                      <label style={{ marginTop: "20px" }}>
                        <input
                          type="text"
                          value={formData.title}
                          name="title"
                          onChange={(e) => handleInputChange(e)}
                          className="event-input"
                          placeholder="Enter Event"
                        />
                      </label>
                      <div className="data-buttons event-btns">
                        <button onClick={handleEventSave} id="event-btn-submit">
                          {selectedEvent ? "Update" : "Create "}
                        </button>
                        <button onClick={closeModal} id="event-btn-cancel">
                          Cancel
                        </button>
                        {selectedEvent ? (
                          <button onClick={handleDelete} id="event-btn-delete">
                            Delete
                          </button>
                        ) : null}
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
                        background: "#f2711c",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0px 20px",
                        color: "white",
                      }}
                    >
                      {event.title}{" "}
                      <span style={{ color: "black" }}>{event.date}</span>
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
