import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import HeadDashboard from "../../components/HeadDashboard";
import { LiaGreaterThanSolid } from "react-icons/lia";
import DataNotFound from "../../assets/images/no data 1.png";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ImageUploader from "react-images-upload";

import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { ThreeDots } from "react-loader-spinner";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import OutlinedInput from "@mui/material/OutlinedInput";

const VolunteersForm = () => {
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    profile: "",
    area: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [volunteer, setVolunteer] = useState([]);
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Type = [
    {
      value: "Choose",
      label: "Select Depatment Name",
    },
    {
      value: "Human Resources Department",
      label: "Human Resources Department",
    },
    {
      value: "Marketing Department",
      label: "Marketing Department",
    },
    {
      value: "Finance Department",
      label: "Finance Department",
    },
    {
      value: "Information Technology Department",
      label: "Information Technology Department",
    },
    {
      value: "Customer Service Department",
      label: "Customer Service Department",
    },
    {
      value: "Research and Development Department",
      label: "Research and Development Department",
    },
    {
      value: "Legal Department",
      label: "Legal Department",
    },
  ];

  const [pictures, setPictures] = useState([]);

  const onDrop = (pictureFiles) => {
    const newPictures = pictureFiles.map((file) => ({
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setPictures([...pictures, ...newPictures]);
  };

  const renderVolunteerData = () => {
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
            It Looks like there is no data to display in this table at this
            moment
          </p>
        </td>
      </tr>
    );
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
            <p style={{ margin: "0" }}>Volunteer List</p>
            <div>
              <span>Volunteers </span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>Volunteer List</span>
            </div>
          </div>
          <div className="paper-head-div" style={{ flexDirection: "column" }}>
            <div id="vol-cont">
              <Dialog className="mt-3" open={open} onClose={handleClose}>
                <DialogTitle id="form-header-popup">Add Volunteer</DialogTitle>
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
                      <TextField
                        id="phone"
                        margin="dense"
                        label="Phone"
                        fullWidth
                        value={formData.phone}
                        onChange={(e) => handleInputChange(e)}
                        name="phone"
                      />
                    </div>
                    <div className="data-input-fields">
                      <TextField
                        id="email"
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        name="email"
                      />
                      <TextField
                        id="password"
                        margin="dense"
                        label="***"
                        fullWidth
                        value={formData.password}
                        onChange={(e) => handleInputChange(e)}
                        name="password"
                      />
                    </div>
                    <div className="data-input-fields">
                      <TextField
                        id="address"
                        margin="dense"
                        label="Address"
                        fullWidth
                        value={formData.address}
                        onChange={(e) => handleInputChange(e)}
                        name="address"
                      />
                      <TextField
                        id="profile"
                        margin="dense"
                        label="Profile"
                        fullWidth
                        value={formData.profile}
                        onChange={(e) => handleInputChange(e)}
                        name="profile"
                      />
                    </div>
                    <div className="data-input-fields">
                      <FormControl fullWidth>
                        <InputLabel id="demo-company-select-label">
                          Area
                        </InputLabel>
                        <Select
                          labelId="demo-area-select-label"
                          id="selectedCompany"
                          value={formData.area}
                          name="area"
                          label="Select"
                          onChange={(e) => handleInputChange(e)}
                          required
                        >
                          {Type &&
                            Type.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.value}>
                                  {item.value}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>

                      <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                      />
                    </div>
                    <div className="data-buttons d-flex justify-content-end">
                      <Button
                        id="input-btn-submit"
                        className="submit"
                        type="submit"
                        onClick={handleClose}
                        variant="outlined"
                        style={{
                          width: "max-content",
                          height: "30px",
                          marginRight: "10px",
                          background: "#7a7474",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        id="input-btn-submit"
                        className="submit"
                        type="submit"
                        // onClick={()}
                        variant="outlined"
                        style={{ width: "max-content", height: "30px" }}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="table-start-container" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleOpen();
                  }}
                  id="add-btn"
                  style={{ width: "max-content" }}
                >
                  <div className="add">
                    <MdAdd />
                    ADD Volunteer
                  </div>
                </Button>
                <input
                  style={{ height: "40px" }}
                  className="table-search"
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <table id="table" className="table table-bordered table-hover">
                <thead>
                  <tr className="" style={{ textTransform: "uppercase" }}>
                    <th></th>
                    <th>Volunteer Id</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Area</th>
                    <th>Email</th>
                    <th>Profile</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteer.length === 0 && click ? (
                    <div
                      style={{
                        position: "absolute",
                        left: "60%",
                        marginTop: "80px",
                      }}
                    >
                      <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="rgba(242, 101, 34, 1)"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : volunteer.length === 0 ? (
                    renderVolunteerData()
                  ) : (
                    (rowsPerPage > 0
                      ? volunteer.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : volunteer
                    )
                      .filter((elem) => {
                        if (search.length === 0) return elem;
                        return (
                          elem.votername
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          elem.mobilenumber.toString().includes(search) ||
                          elem.state
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          elem.district
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          elem.pincode.toString().includes(search)
                        );
                      })
                      .map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.votername}</td>
                          <td>{data.mobilenumber}</td>
                          <td>{data.state}</td>
                          <td>{data.district}</td>
                          <td>{data.pincode}</td>
                        </tr>
                      ))
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <CustomTablePagination
                      id="pagingg"
                      rowsPerPageOptions={[
                        10,
                        20,
                        30,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={12}
                      count={volunteer.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          "aria-label": "rows per page",
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteersForm;
