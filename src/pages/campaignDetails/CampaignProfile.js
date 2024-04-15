import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";

const CampaignProfile = () => {
  const { id } = useParams();

  const [campaigns, setCampaigns] = useState({
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
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    const result = await axios.get("http://localhost:8080/campaigndetails/get/campaigndetails"
    );
    setCampaigns(result.data);
  };
//   const [menu, setMenu] = useState(false);


  return (
    <div>
      {/* <div id="header-container" className="header-container">
        <Header menu={menu} setMenu={setMenu} />
      </div> */}
      <div className="dashboard-container">
        {/* <SideBar menu={menu} setMenu={setMenu} /> */}
        <div className="head-foot-part" style={{ padding: "0" }}>
          <div className="shadow" style={{ backgroundColor: "whitesmoke" }}>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-3">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 150 }}
                      />
                      <h5 className="my-3">
                        {`${campaigns.campaignname} ${campaigns.campaignname}`}
                      </h5>
                      <div className="d-flex justify-content-center mb-2">
                      <Link to="/campaigns">
                          <button
                            type="button"
                            className="btn btn-outline-secondary ms-1"
                          >
                            Back
                          </button>
                        </Link>
                       
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="card mb-4">
                    <div className="card-body">
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Campaign Name</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{campaigns.campaignname}</p>
                        </div>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Campaign Type</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{campaigns.campaigntype}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Campaign Date</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{campaigns.campaigndate}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Campaign Objective</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{campaigns.campaignobjective}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Start Time</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {campaigns.starttime}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">End Time</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{campaigns.endtime}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Location</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {campaigns.location}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Campaign Budget</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {campaigns.campaignbudget}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Volunteers Assigned</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {campaigns.volunteersassigned}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Campaign Materials</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{campaigns.campaignmaterials}</p>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignProfile;
