import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import HeadDashboard from "../../components/HeadDashboard";
import { LiaGreaterThanSolid } from "react-icons/lia";
import Button from "@mui/material/Button";
import { MdAdd } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { ThreeDots } from "react-loader-spinner";
import DataNotFound from "../../assets/images/no data 1.png";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { styled } from "@mui/system";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAnalysis = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [toastClass, setToastClass] = useState("");
  const showToastMessage = () => {
    toast.success("Success Notification !");
  };
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding: 0 0 0 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0rem;
    }
  `;
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState("strengths");
  const [formData, setFormData] = useState(
    card === "strengths"
      ? {
          strength: "",
          note: "",
        }
      : card === "weakness"
      ? {
          weakness: "",
          note: "",
        }
      : card === "opportunities"
      ? {
          opportunity: "",
          note: "",
        }
      : {
          threat: "",
          note: "",
        }
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [voter, setVoter] = useState([]);

  useEffect(() => {
    getData();
  }, [card]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://13.201.88.48:6060/${card}`);
      setVoter(response.data);
    } catch (error) {
      console.error("Error getting data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://13.201.88.48:6060/${card}`,
        formData
      );
      toast.success("Submitted Successfully !");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Submission Failed !");
      console.error("Post failed", error);
    }
  };

  const [rec, setRec] = useState("");

  useEffect(() => {
    handleDelete();
  }, [rec]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://13.201.88.48:6060/${card}/${rec}`);
      toast.success("Deleted Successfully !");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const renderCompanyData = () => {
    return (
      <tr>
        <td colSpan="12" className="text-center">
          <img
            style={{ margin: "50px 0 50px 0" }}
            src={DataNotFound}
            alt="No Data Found"
          ></img>
          <h1>No Data Found!</h1>
          <p>
            It Looks like there is no data to display in this table at the
            moment
          </p>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className={toastClass}
        toastClassName="dark-toast"
      />
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
            <p style={{ margin: "0" }}>Campaign Analysis</p>
            <div>
              <span style={{ color: "#f26522" }}></span>
            </div>
          </div>

          <div className="campaign-cards">
            <div
              className="campaign-card"
              onClick={() => {
                setCard("strengths");
                setFormData({
                  strength: "",
                  note: "",
                });
              }}
            >
              Strength
            </div>
            <div
              className="campaign-card"
              onClick={() => {
                setCard("weaknesses");
                setFormData({
                  weakness: "",
                  note: "",
                });
              }}
            >
              Weakness
            </div>
            <div
              className="campaign-card"
              onClick={() => {
                setCard("opportunities");
                setFormData({
                  opportunity: "",
                  note: "",
                });
              }}
            >
              Opportunities
            </div>
            <div
              className="campaign-card"
              onClick={() => {
                setCard("threats");
                setFormData({
                  threat: "",
                  note: "",
                });
              }}
            >
              Threat
            </div>
          </div>
          <div className="campaign-add-btn">
            <Button
              variant="outlined"
              onClick={() => {
                handleOpen();
              }}
              id="add-btn"
              style={{ width: "max-content", marginTop: "20px" }}
            >
              <div className="add">
                <MdAdd />
                ADD <span style={{ textTransform: "uppercase" }}>{card}</span>
              </div>
            </Button>
          </div>
          <br />
          <div className="paper-head-div" style={{ flexDirection: "column" }}>
            <table id="table" className="table table-bordered table-hover">
              <thead>
                <tr className="" style={{ textTransform: "uppercase" }}>
                  <th>#</th>
                  <th className="text-center">{card}</th>
                  <th className="text-center">Note</th>
                  <th className="text-center">Options</th>
                </tr>
              </thead>
              <tbody>
                {voter.length === 0
                  ? renderCompanyData()
                  : (rowsPerPage > 0
                      ? voter.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : voter
                    )
                      .filter((elem) => {
                        if (search.length === 0) return elem;
                        return (
                          elem.strength
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          elem.note
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          elem.options
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        );
                      })
                      .map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {card === "strengths"
                              ? data.strength
                              : card === "weaknesses"
                              ? data.weakness
                              : card === "opportunities"
                              ? data.opportunity
                              : data.threat}
                          </td>
                          <td>{data.note}</td>
                          <td
                            className="text-center fs-5"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() =>
                              card === "strengths"
                                ? setRec(data.strengthId)
                                : card === "weaknesses"
                                ? setRec(data.weaknessId)
                                : card === "opportunities"
                                ? setRec(data.opportunityId)
                                : setRec(data.threatId)
                            }
                          >
                            <AiOutlineDelete />
                          </td>
                        </tr>
                      ))}
              </tbody>
              <tfoot>
                <tr>
                  <CustomTablePagination
                    id="pagingg"
                    rowsPerPageOptions={[
                      25,
                      50,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={12}
                    count={voter.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        "aria-label": "rows per page",
                      },
                      actions: {
                        // showFirstButton: true,
                        // showLastButton: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </tr>
              </tfoot>
            </table>
            <Dialog className="mt-3" open={open} onClose={handleClose}>
              <DialogTitle id="form-header-popup">Add Analysis</DialogTitle>
              <DialogContent>
                <form style={{ width: "100%" }}>
                  <div className="data-input-fields">
                    <TextField
                      margin="dense"
                      label="Name"
                      fullWidth
                      value={
                        card === "strengths"
                          ? formData.strength
                          : card === "weaknesses"
                          ? formData.weakness
                          : card === "opportunities"
                          ? formData.opportunity
                          : formData.threat
                      }
                      onChange={(e) => handleInputChange(e)}
                      name={
                        card === "strengths"
                          ? "strength"
                          : card === "weaknesses"
                          ? "weakness"
                          : card === "opportunities"
                          ? "opportunity"
                          : "threat"
                      }
                    />
                  </div>
                  <div className="data-input-fields">
                    <TextField
                      id="note"
                      margin="dense"
                      label="Note"
                      fullWidth
                      value={formData.note}
                      onChange={(e) => handleInputChange(e)}
                      name="note"
                    />
                  </div>

                  <div className="data-buttons d-flex justify-content-end">
                    <Button
                      id="input-btn-submit"
                      className="submit"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      variant="outlined"
                      style={{ width: "max-content", height: "40px" }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {showDeleteConfirmation && (
          <div className="confirmation">
            <div className="confirmation-popup d-flex align-items-center justify-content-center">
              <div>
                <p className="fs-4 fw-bold">
                  Are you sure you want to delete this item?
                </p>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <Button
                    id="input-btn-submit"
                    style={{ width: "100%" }}
                    variant="contained"
                  >
                    Yes
                  </Button>
                  <Button
                    id="input-btn-cancel"
                    style={{ width: "100%" }}
                    variant="outlined"
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAnalysis;
