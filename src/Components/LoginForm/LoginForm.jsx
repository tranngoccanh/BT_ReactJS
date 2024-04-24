import React, { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProfileToLS } from "../../utils/auth";
import { AppContext } from "../context/app.context";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const { setProfile, profile } = useContext(AppContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setPasswordInputType(passwordVisible ? "password" : "text");
  };

  const [students, setStudents] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://66179268ed6b8fa434830f0b.mockapi.io/api/students"
        );
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [LoginData, setLoginData] = useState({ email: "", password: "" });
  const [ErrorData, setErrorData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({
      ...LoginData,
      [e.target.name]: e.target.value,
    });
    setErrorData({
      ...ErrorData,
      [e.target.name]: "",
    });
  };
  console.log(ErrorData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
    const checkPassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;

    let flagCheck = true;
    if (!checkEmail.test(LoginData.email)) {
      setErrorData({
        ...ErrorData,
        email: "Nhap sai roi!!!",
      });
      flagCheck = false;
    } else if (!checkPassword.test(LoginData.password)) {
      setErrorData({
        ...ErrorData,
        password: "Nhap sai roi!!!",
      });
      flagCheck = false;
    }

    if (!flagCheck) {
      window.alert("Lỗi");
    } else {
      const loginInformation = students?.find(
        (item) =>
          item.email === LoginData.email && item.password === LoginData.password
      );
      if (loginInformation) {
        // localStorage.setItem("userDetail", JSON.stringify(loginInformation));
        setProfileToLS(loginInformation)
        setProfile(loginInformation)
        console.log(localStorage.getItem("userDetail"));
        nav("/");
      } else {
        window.alert("Nhap sai roi bro !");
      }
    }
  };

  return (
    <div className="LoginForm">
      <form>
        <div className="Login_header">
          <h2>CRUD OPERATIONS</h2>
          <h4>SIGN IN</h4>
          <p>Enter your credentials to access your account</p>
        </div>
        <div className="Login_body">
          <div className="input_box Email">
            <label className="label_Email">Email</label>
            <input
              className="input_Email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
            ></input>
          </div>
          <div className="input_box Password">
            <label className="label_Password">Password</label>
            <input
              className="input_Password"
              type={passwordInputType}
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
            ></input>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="togglePasswordButton"
            >
              {passwordVisible ? (
                <FaEyeSlash className="icon" />
              ) : (
                <FaEye className="icon" />
              )}
            </button>
          </div>
        </div>
        <div className="Login_footer">
          <button className="btn" onClick={handleSubmit}>
            SIGN IN
          </button>
          <p>
            Forgot your password ? <a>Reset Password</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
