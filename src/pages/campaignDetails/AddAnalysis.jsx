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

const AddAnalysis = () => {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    note: "",
  });

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
              <span>Campaign Analysis</span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}></span>
            </div>
          </div>
          <div className="paper-head-div">
            <div className="table-start-container" style={{ width: "100%" }}>
              <div className="row">
                <div className="col">
                  <div
                    className=" table-ka-top-btns"
                    style={{ marginTop: "1px" }}
                  >
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
                        ADD STRENGTH
                      </div>
                    </Button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Strength</th>
                        <th>Note</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Data 1</td>
                        <td>Data 2</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
                <div className="col">
                  <div
                    className=" table-ka-top-btns"
                    style={{ marginTop: "1px" }}
                  >
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
                        ADD WEAKNESS
                      </div>
                    </Button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Weakness</th>
                        <th>Note</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Data 1</td>
                        <td>Data 2</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className=" table-ka-top-btns">
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
                        ADD OPPORTUNITIES
                      </div>
                    </Button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th></th>
                        <th>Note</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Data 1</td>
                        <td>Data 2</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
                <div className="col">
                  <div className=" table-ka-top-btns">
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
                        ADD THREAT
                      </div>
                    </Button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th></th>
                        <th>Note</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Data 1</td>
                        <td>Data 2</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
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
      </div>
    </div>
  );
};

export default AddAnalysis;
