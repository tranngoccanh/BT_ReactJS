import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { FaFile } from "react-icons/fa6";
import { FaSliders } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { AppContext } from "../context/app.context";
import { clearLS } from "../../utils/auth";
import axios from "axios";

const Sidebar = () => {
  const nav = useNavigate();
  const { profile, setProfile } = useContext(AppContext);
  const [userInfo,setUserInfo] =useState();
  useEffect(()=>{
   const res = async()=>{
    try {
      const response = await axios.get(
        `https://66179268ed6b8fa434830f0b.mockapi.io/api/students/${profile.id}`
      );
       setUserInfo(response.data)
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
   }
   res()
  },[])
  const logOut = () => {
    clearLS();
    setProfile(null);
    nav("/login");
  };
  

  return (
    <div className="FormSidebar">
      <div className="SideBar_header">
        <h3>CRUD OPERATIONS</h3>

        <div className="img">
          <img src={userInfo?.avatar}></img>
        </div>
        <div>
          <h4>{userInfo?.name}</h4>
          <p>Admin</p>
        </div>
        <div className="sidebar_body">
          <div className="sidebar_button active">
            <FaHome />
            <Link to="/">Home</Link>
          </div>
          <div className="sidebar_button">
            <FaBookmark />
            <Link>Course</Link>
          </div>
          <div className="sidebar_button">
            <FaGraduationCap />
            <Link to="/students">Students</Link>
          </div>
          <div className="sidebar_button">
            <FiDollarSign />
            <Link>Payment</Link>
          </div>
          <div className="sidebar_button">
            <FaFile />
            <Link>Report</Link>
          </div>
          <div className="sidebar_button">
            <FaSliders />
            <Link>Settings</Link>
          </div>
        </div>
        <div className="SideBar_footer">
          <div className="sidebar_button" onClick={logOut}>
            <Link to="/login">Logout</Link>
            <FaSignOutAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
