import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BiSolidHide } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import "../../styles.css";

const CampaignForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    campaignname: "",
    campaigntype: "",
    campaigndate: "",
    campaignobjective: "",
    starttime: "",
    endtime: "",
    location: "",
    campaignbudget: "",
    volunteersassigned: "",
    campaignmaterials: "",
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/campaigndetails/get/campaigndetails"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }
      const data = await response.json();
      setCampaigns(data);
      console.log("Fetched Campaigns:", data); // Add this line to print the fetched data
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Fetched Campaigns:", formData);
    try {
      const response = await fetch(
        "http://localhost:8080/campaigndetails/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }
      console.log("Campaign created successfully");
      fetchCampaigns();
      setFormData({
        campaignname: "",
        campaigntype: "",
        campaigndate: "",
        campaignobjective: "",
        starttime: "",
        endtime: "",
        location: "",
        campaignbudget: "",
        volunteersassigned: "",
        campaignmaterials: "",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const deleteCampaign = async (campaigndetailsid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/campaigndetails/delete/${campaigndetailsid}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete campaign");
      }
      console.log("Campaign deleted successfully");
      fetchCampaigns(); // Refresh the campaign list after deletion
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const cancelButton = () => {
    setFormVisible(false);
    setFormData({
      campaignname: "",
      campaigntype: "",
      campaigndate: "",
      campaignobjective: "",
      starttime: "",
      endtime: "",
      location: "",
      campaignbudget: "",
      volunteersassigned: "",
      campaignmaterials: "",
    });
  };
  const Type = [
    {
      value: "Choose",
      label: "Select Campaign",
    },
    {
      value: "Ground Campaigns",
      label: "Ground Campaigns",
    },
    {
      value: "Media Campaigns",
      label: "Media Campaigns",
    },
    {
      value: "Digital Campaigns",
      label: "Digital Campaigns",
    },
  ];

  return (
    <Router>
      <div>
        <div className="data-input-fields">
          <Button
            variant="outlined"
            onClick={() => setFormVisible(!formVisible)}
            id="add-btn"
            style={{ width: "max-content", marginTop: "20px" }}
          >
            {formVisible ? (
              <div className="hide">
                <BiSolidHide />
                HIDE
              </div>
            ) : (
              <div className="add">
                <MdAdd />
                ADD CAMPAIGN
              </div>
            )}
          </Button>
        </div>

        {formVisible && (
          <form onSubmit={handleSubmit}>
            <div className="head"> CAMPAIGN FORM</div>
            <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Campaign Name"
                type="text"
                fullWidth
                name="campaignname"
                id="campaignname"
                value={formData.campaignname}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                id="Campaign Type"
                margin="dense"
                select
                label="campaignType"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.campaigntype}
                onChange={(e) => handleInputChange(e)}
                name="campaigntype"
              >
                {Type.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          
          <div className="data-input-fields">
            <TextField
              margin="dense"
              label="Campaign Date"
              type="date"
              fullWidth
              name="campaigndate"
              id="campaigndate"
              value={formData.campaigndate}
              onChange={(e) => handleInputChange(e)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Campaign Objective"
              type="text"
              fullWidth
              name="campaignobjective"
              id="campaignobjective"
              value={formData.campaignobjective}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="data-input-fields">
            <TextField
              margin="dense"
              label="Start Time"
              type="time"
              fullWidth
              name="starttime"
              id="starttime"
              value={formData.starttime}
              onChange={(e) => handleInputChange(e)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="End Time"
              type="time"
              fullWidth
              name="endtime"
              id="endtime"
              value={formData.endtime}
              onChange={(e) => handleInputChange(e)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="data-input-fields">
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              name="location"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <TextField
              margin="dense"
              label="Campaign Budget"
              type="number"
              fullWidth
              name="campaignbudget"
              id="campaignbudget"
              value={formData.campaignbudget}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="data-input-fields">
            <TextField
              margin="dense"
              label="Volunters Assigned"
              type="text"
              fullWidth
              name="volunteersassigned"
              id="volunteersaassigned"
              value={formData.volunteersassigned}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <TextField
              margin="dense"
              label="Campaign Material"
              type="text"
              fullWidth
              name="campaignmaterials"
              id="campaignmaterials"
              value={formData.campaignmaterials}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <Button id="input-btn-submit" variant="outlined" type="submit">
            Submit
          </Button>
          <Button id="input-btn-cancel" variant="outlined" onClick={cancelButton}>
            Cancel
          </Button>
          </form>
        )}

        <div className="table-start-container">
          <table
            id="table"
            className="table table-bordered table-hover shadow"
          >
            <thead>
              <tr className="text-center">
                <th>SL NO</th>
                <th>Campaign Name</th>
                <th>Campaign Type</th>
                <th>Campaign Date</th>
                <th>Budget</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {campaigns &&
                campaigns.map((campaignItem,index) => (
                  <tr key={campaignItem.campaigndetailsid}>
                    <td scope="row">{index + 1}</td>
                    <td>{campaignItem.campaignname}</td>
                    <td>{campaignItem.campaigntype}</td>
                    <td>{campaignItem.campaigndate}</td>
                    <td>{campaignItem.campaignbudget}</td>
                    <td className="mx-2">
                      <Link
                        to={`/edit-campaign/${campaignItem.campaigndetailsid}`}
                        // className="btn btn-warning"
                      >
                        <FaEdit />
                      </Link>
                    </td>
                    <td className="mx-2">
                      <Link
                        to={`/campign-profile/${campaignItem.campaigndetailsid}`}
                        // className="btn btn-warning"
                      >
                        <FaEye />
                      </Link>
                    </td>
                    <td className="mx-2">
                        <FaTrashAlt
                          className="action-delete"
                          onClick={() => deleteCampaign(campaignItem.campaigndetailsid)}
                        />
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Router>
  );
};

export default CampaignForm;
