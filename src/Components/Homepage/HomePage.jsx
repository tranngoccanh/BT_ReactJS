import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { LuGraduationCap } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import Header from "../Header/Header";
import axios from "axios";

const HomePage = () => {
  const [students, setStudents] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://66179268ed6b8fa434830f0b.mockapi.io/api/students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="HomePage_Form">
      <form>
        <Header />
        <div className="Home_main">
          <div className="count_student">
            <LuGraduationCap className="icon_student" />
            <p>Students</p>
            <p>{students ? students.length : 0}</p>
          </div>
          <div className="count_course">
            <FaRegBookmark className="icon_course" />
            <p>Courses</p>
            <p>13</p>
          </div>
          <div className="count_payments">
            <LuCircleDollarSign className="icon_payments" />
            <p>Payments</p>
            <p>
              <span>INR</span> 556,000
            </p>
          </div>
          <div className="count_users">
            <FaRegUser className="icon_users" />
            <p>Users</p>
            <p>3</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
