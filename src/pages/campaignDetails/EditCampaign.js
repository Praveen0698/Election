import React, {
    useEffect,
    useState,
  } from "react";
  import axios from "axios";
  import Button from "@mui/material/Button";
  import {
    Link,
    useNavigate,
    useParams,
  } from "react-router-dom";
  
  const EditTicket = () => {
    let navigate = useNavigate();
  
    const { id } = useParams();

  
    const [campaigns, setCampaigns] = useState({
        campaignname: "",
        campaigndate: "",
    });
   
    useEffect(() => {
      loadCampaign();
    }, []);
  
    const loadCampaign = async () => {
      const result = await axios.get(
        `http://localhost:8080/campaigndetails/get/${id}`
      );
      setCampaigns(result.data);
    };
  
    const handleInputChange = (e) => {
        setCampaigns({
        ...campaigns,
        [e.target.name]: e.target.value,
      });
    };
    const updateCampaign = async (e) => {
      e.preventDefault();
      await axios.put(
        `http://localhost:8080/campaigndetails/update/${id}`,
        campaigns
      );
      navigate("/");
    };

    const [menu, setMenu] = useState(false);
  
    return (
      <div>
    <div id="header-container" className="header-container">
        {/* <CompanyLogoFile /> */}
        {/* <Header menu={menu} setMenu={setMenu} /> */}
      </div>
      <div className="dashboard-container">
        {/* <SideBar menu={menu} setMenu={setMenu} /> */}
		  <div className="head-foot-part" style={{ padding: "0" }}>
        <div className="col-sm-8 py-2 px-5  shadow">
        <h2 className="mt-5"> Edit Campaign</h2>
        <form onSubmit={(e) => updateCampaign(e)}>
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="campaignname">
            campaign Name
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="campaignname"
              id="campaignname"
              required
              value={campaigns.campaignname}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="campaignname">
            campaign Date
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="campaigndate"
              id="campaigndate"
              required
              value={campaigns.campaigndate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="data-buttons">
                <Button id="input-btn-submit" variant="outlined" type="submit">
                  Submit
                </Button>
                <Button
                  id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/campaign")}
                >
                  Back
                </Button>
              </div>
        </form>
      </div>
        </div>
      </div>
    </div>
     
    );
  };
  
  export default EditTicket;
  