import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlashLight } from "react-icons/pi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const Navigate = useNavigate();
  const [look, setLook] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Navigate("/dashboard");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        formData
      );
      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Navigate("/dashboard", { state: { token: response.data } });
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="register">
        <div className="register-form">
          <form
            className="register-form-content"
            style={{ flexGrow: 1 }}
            onSubmit={handleSubmit}
          >
            <div className="register-form-header">LOGIN</div>
            <div className="register-input-fields">
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="data-input-fields-login" id="eye-id">
                <TextField
                  className="master-input"
                  margin="dense"
                  type={look ? "text" : "password"}
                  fullWidth
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
            </div>
            <div className="data-buttons">
              <p style={{ fontWeight: "600", fontSize: "0.8rem" }}>
                Forgot Password?
              </p>
              <div style={{ marginTop: "10px" }} id="recaptcha"></div>
              <Button
                id="input-btn-submit"
                className="submit"
                type="submit"
                variant="outlined"
              >
                Login
              </Button>
            </div>
            {/* <div className="register-footer">
              <p>
                New User?
                <Link to="/register">
                  <span style={{ fontWeight: "700", color: "black" }}>
                    SIGN UP HERE
                  </span>
                </Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
