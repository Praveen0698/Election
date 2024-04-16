import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlashLight } from "react-icons/pi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate,Link } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const Navigate = useNavigate();
  const [dec, setDec] = useState("");
  const [look, setLook] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    otp:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://13.201.88.48:7070/api/v1/auth/authenticate",
        formData
      );
      console.log("Login successful", response.data);
      //   const token = localStorage.getItem("AuthToken");
      const decoded = response.data.access_token
        ? jwtDecode(String(response.data.access_token))
        : "";
      console.log("decoded", decoded);
      if (decoded.role === "MP") {
        Navigate("/dashboard");
        localStorage.setItem("FName", decoded.firstname);
        localStorage.setItem("LName", decoded.lastname);
        localStorage.setItem("AuthToken", response.data.access_token);
        localStorage.setItem("Role", decoded.role);
        window.location.reload();
      } else {
        try {
          setDec(decoded);
          const emailRes = await axios.post(
            `http://13.201.88.48:7070/api/v1/auth/initiate-otp-login/${decoded.email}`
          );
        } catch (error) {
          console.error("Email Failed", error);
        }
        // const otpRes = await axios.post(
        //   https://api.orivehrms.com/api/v1/auth/login-email-otp/${decoded.email}/424098
        // );
        // console.log("RESSS", otpRes);
        // nav("/Employee-Dashboard");
        // localStorage.setItem("FName", decoded.firstname);
        // localStorage.setItem("LName", decoded.lastname);
        // localStorage.setItem("AuthToken", response.data.access_token);
        // localStorage.setItem("Role", decoded.role);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleMlaLogin = async () => {
    try {
      const otpRes = await axios.post(
        `http://13.201.88.48:7070/api/v1/auth/login-email-otp/${dec.email}/${formData.otp}`
      );
      Navigate("/dashboard");
      localStorage.setItem("FName", dec.firstname);
      localStorage.setItem("LName", dec.lastname);
      localStorage.setItem("AuthToken", otpRes.data.access_token);
      localStorage.setItem("Role", dec.role);
      window.location.reload();
    } catch (error) {
      alert("Check the OTP!!")
      console.error("MLA login failed", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="register">
        <div className="register-form">
        {dec.role === "MLA" ? (
            <form
              className="register-form-content"
              style={{ flexGrow: 1, height: "385px" }}
              onSubmit={handleSubmit}
            >
              <div className="register-form-header">OTP</div>
              <div className="register-input-fields">
                <div className="data-input-fields-login">
                  <TextField
                    className="master-input"
                    margin="dense"
                    type="number"
                    fullWidth
                    placeholder="Enter OTP"
                    name="otp"
                    id="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="">
                <Button
                  id="input-btn-submit"
                  className="submit"
                  type="submit"
                  variant="outlined"
                  onClick={handleMlaLogin}
                >
                  Verify and Login
                </Button>
              </div>
              <br />
            </form>
          ) : (
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
                    placeholder="Employee Id"
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
                    <PiEyeLight
                      className="eye"
                      onClick={() => setLook(false)}
                    />
                  ) : (
                    <PiEyeSlashLight
                      className="eye"
                      onClick={() => setLook(true)}
                    />
                  )}
                </div>
              </div>
              <div className="">
                <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
                  <div
                    className="d-flex align-items-center"
                    style={{ fontWeight: "600", fontSize: "0.8rem" }}
                  >
                    <input className="" type="checkbox" />
                    <div>Remember Me</div>
                  </div>
                  <div style={{ fontWeight: "600", fontSize: "0.8rem" }}>
                    Forgot Password?
                  </div>
                </div>
                <Button
                  id="input-btn-submit"
                  className="submit"
                  type="submit"
                  variant="outlined"
                >
                  Login
                </Button>
              </div>
              <br />
              <div className="register-footer">
                <p>
                  Don’t have a account yet?
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/register"
                    onClick={() => localStorage.removeItem("AuthToken")}
                  >
                    <span
                      className="mx-1"
                      style={{ fontWeight: "600", color: "black" }}
                    >
                      Register
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;