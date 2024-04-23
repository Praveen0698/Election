import React, { useEffect, useState } from "react";
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
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

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
import axios from "axios";

const VotersList = () => {
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
    address: "",
    gender: "",
    image_upload: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [Voter, setVoter] = useState([]);
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const genderType = [
    {
      value: "Choose",
      label: "Select Gender",
    },
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "others",
      label: "Others",
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

  useEffect(() => {
    if (pictures.length > 0) {
      setFormData({
        ...formData,
        image_upload: pictures[0].file,
      });
    }
  }, [pictures]);

  const renderVoterData = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    await axios
      .post(
        "http://13.201.88.48:7070/voterdatabase/create/voterdatabase",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(() => {
        toast.success("Added Successfully !");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setPictures([]);
      })
      .catch((err) => console.error(err));
  };

  const getVoter = async () => {
    await axios
      .get("http://13.201.88.48:7070/voterdatabase/get/voterdatabase")
      .then((res) => {
        setVoter(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getVoter();
  }, []);

  const deleteVoter = async (sl) => {
    await axios
      .delete(`http://13.201.88.48:7070/voterdatabase/delete/${sl}`)
      .then(() => {
        toast.success("Deleted Successfully !");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })

      .catch((error) => console.error("Error deleting campaign:", error));
  };
  return (
    <div>
      <ToastContainer
        autoClose={2000}
        position="top-center"
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
            <p style={{ margin: "0" }}>Voters</p>
            <div>
              <span>Voters </span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>Voters List</span>
            </div>
          </div>
          <div className="paper-head-div" style={{ flexDirection: "column" }}>
            <div id="vol-cont">
              <Dialog className="mt-3" open={open} onClose={handleClose}>
                <DialogTitle id="form-header-popup">Add Voters</DialogTitle>
                <DialogContent>
                  <form style={{ width: "100%" }} onSubmit={handleSubmit}>
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
                        id="address"
                        margin="dense"
                        label="Address"
                        fullWidth
                        value={formData.address}
                        onChange={(e) => handleInputChange(e)}
                        name="address"
                      />
                    </div>
                    <div className="data-input-fields">
                      <FormControl fullWidth>
                        <InputLabel id="demo-company-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-area-select-label"
                          id="selectedCompany"
                          value={formData.gender}
                          name="gender"
                          label="Select"
                          onChange={(e) => handleInputChange(e)}
                          required
                        >
                          {genderType &&
                            genderType.map((item, index) => {
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
                        onClick={handleSave}
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
                    ADD Voter
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
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {Voter.length === 0 && click ? (
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
                  ) : Voter.length === 0 ? (
                    renderVoterData()
                  ) : (
                    (rowsPerPage > 0
                      ? Voter.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : Voter
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
                          <td>{data.name}</td>
                          <td>{data.phone}</td>
                          <td>{data.address}</td>
                          <td>{data.gender}</td>
                          <td className="text-center">
                            <FaTrashAlt
                              // className="action-delete"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => deleteVoter(data.sl)}
                            />
                          </td>
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
                      count={Voter.length}
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

export default VotersList;
