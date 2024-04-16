import React, { useState } from "react";
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

const AddAnalysis = () => {
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
  const [formData, setFormData] = useState({
    name: "",
    note: "",
  });

  const [card, setCard] = useState("strength");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const strength = [
    {
      strength: "Confidence",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      strength: "Confidence",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      strength: "Confidence",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      strength: "Confidence",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      strength: "Confidence",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
  ];
  const weakness = [
    {
      weakness: "weakness",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      weakness: "weakness",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      weakness: "weakness",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      weakness: "weakness",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      weakness: "weakness",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
  ];
  const opportunities = [
    {
      opportunities: "opportunities",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      opportunities: "opportunities",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      opportunities: "opportunities",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      opportunities: "opportunities",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      opportunities: "opportunities",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
  ];
  const threat = [
    {
      threat: "threat",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      threat: "threat",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      threat: "threat",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      threat: "threat",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
    {
      threat: "threat",
      note: "Election jeetne kaa",
      options: "Option nahi rakhne ka, jeetne ka bas",
    },
  ];

  const [voter, setVoter] = useState(strength);

  console.log("formdata", formData);

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
            <div className="campaign-card" onClick={()=>{setCard("strength"); setVoter(strength); setFormData({...formData, name:"", note:""})}}>Strength</div>
            <div className="campaign-card" onClick={()=>{setCard("weakness"); setVoter(weakness); setFormData({...formData, name:"", note:""})}}>Weakness</div>
            <div className="campaign-card" onClick={()=>{setCard("opportunities"); setVoter(opportunities); setFormData({...formData, name:"", note:""})}}>Opportunities</div>
            <div className="campaign-card" onClick={()=>{setCard("threat"); setVoter(threat); setFormData({...formData, name:"", note:""})}}>Threat</div>
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
                ADD <span style={{textTransform:"uppercase"}}>{card}</span>
              </div>
            </Button>
          </div>
          <br />
          <table id="table" className="table table-bordered table-hover">
            <thead>
              <tr className="" style={{ textTransform: "uppercase" }}>
                <th>#</th>
                <th>{card}</th>
                <th>Note</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {voter.length === 0 ? (
                renderCompanyData()
              ) : (
                (rowsPerPage > 0
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
                      elem.note.toLowerCase().includes(search.toLowerCase()) ||
                      elem.options.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{card==="strength"?data.strength:card==="weakness"?data.weakness:card==="opportunities"?data.opportunities:data.threat}</td>
                      <td>{data.note}</td>
                      <td>{data.options}</td>
                    </tr>
                  ))
              )}
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
                    id="name"
                    margin="dense"
                    label="Name"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
                    name="name"
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
                    // onClick={()}
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
    </div>
  );
};

export default AddAnalysis;
