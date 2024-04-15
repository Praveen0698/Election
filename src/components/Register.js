import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlashLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const Navigate = useNavigate();
  const [look, setLook] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email:"",
    password:"",
    role:"",
    mobilenumber:"",
    username:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        formData
      );
      Navigate("/",{state:{token:response.data}})
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div>
      <div className="register">
        <div className="register-form">
          <form className="register-form-content" style={{ flexGrow: 1 }}
          onSubmit={handleSubmit}>
            <div className="register-form-header">REGISTER</div>
            <div className="register-input-fields">
              <div className="data-input-fields-register">
                <TextField
                  className="master-input"
                  margin="dense"
                  type="text"
                  fullWidth
                  placeholder="First Name"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="data-input-fields-login">
                <TextField
                  className="master-input"
                  margin="dense"
                  type="text"
                  fullWidth
                  placeholder="Last Name"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="data-input-fields-login" id="eye-id">
                <TextField
                  className="master-input"
                  margin="dense"
                  type="email"
                  fullWidth
                  placeholder="Email Id"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                {/* {look ? (
                  <PiEyeLight className="eye" onClick={() => setLook(false)} />
                ) : (
                  <PiEyeSlashLight
                    className="eye"
                    onClick={() => setLook(true)}
                  />
                )} */}
              </div>
              <div className="data-input-fields-login" id="eye-id">
                <TextField
                  className="master-input"
                  margin="dense"
                  type="password"
                  fullWidth
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                {look ? (
                  <PiEyeLight className="eye" onClick={() => setLook(false)} />
                ) : (
                  <PiEyeSlashLight
                    className="eye"
                    onClick={() => setLook(true)}
                  />
                )}
              </div>

              <div className="data-input-fields-login">
                <TextField
                  className="master-input"
                  margin="dense"
                  type="text"
                  fullWidth
                  placeholder="Role"
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              <div className="data-input-fields-login">
                <TextField
                  className="master-input"
                  margin="dense"
                  type="number"
                  fullWidth
                  placeholder="Mobile Number"
                  name="mobilenumber"
                  id="mobilenumber"
                  value={formData.mobilenumber}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              <div className="data-input-fields-login">
                <TextField
                  className="master-input"
                  margin="dense"
                  type="text"
                  fullWidth
                  placeholder="User Name"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              {/* <ReCAPTCHA
                className="register-captcha"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              /> */}
            </div>
            <div className="data-buttons">
              <Button
                id="input-btn-submit"
                className="submit"
                type="submit"
                variant="outlined"
                // onClick={() => nav("/")}
                //   onClick={handleSave}
                // disabled={buttonCheck ? false : true}
              >
                Register
              </Button>
            </div>
            {/* <div className="register-footer">
              <p>
                Already have an account?
                <Link to='/'>
                  <span style={{ fontWeight: "700",color:'black' }}>LOGIN HERE</span>
                </Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;