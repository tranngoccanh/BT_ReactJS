import React, { useEffect, useState } from "react";
import "./StudentsForm.css";
import { TbCaretUpDown } from "react-icons/tb";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import EditPopup from "../Popup/EditPopup";
import Pagination from "../Pagination/Pagination";
import { Popconfirm, message } from "antd";
import dayjs from "dayjs";

const StudentsForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [students, setStudents] = useState([]);

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
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://66179268ed6b8fa434830f0b.mockapi.io/api/students/${id}`
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = students.slice(firstPostIndex, lastPostIndex);
  const confirm = (id) => {
    deleteUser(id);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const [date,setDate] =useState();
  const changeDate = () => {
         let date1 =new Date();
         date1.toLocaleString();
        setDate(date1);
  };
  
  return (
    <div className="Students_Form">
      <form>
        <Header />
        <div className="Students_main">
          <div className="students_main_top">
            <p>Students List</p>
            <div className="add_button">
              <TbCaretUpDown className="icon_arrow" />
              <Popup />
            </div>
          </div>
          <hr />
          <div className="tables">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Eroll number</div>
            <div>Date of admission</div>
          </div>
          {currentPosts.map((student, index) => (
            <div className="table_content" key={index}>
              <div className="avt">
                <img src={student.avatar} alt={student.Name} />
              </div>
              <div>{student.name}</div>
              <div>{student.email}</div>
              <div>{student.phone}</div>
              <div>{student.enroll}</div>
              <div>{dayjs(student.birthDay).format("DD/MM/YYYY") }</div>
              <div
                className="edit_student"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeDate();
                }}
              >
                <EditPopup userId={student.id} date={date}/>
              </div>
              <div style={{ cursor: "pointer" }}>
                <Popconfirm
                  title="Xoa nhaaaaa"
                  description="Chac chan muon xoa chua ?"
                  onConfirm={() => {
                    confirm(student.id);
                  }}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <MdDeleteOutline className="content_icon" />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      </form>
      <Pagination
        totalPosts={students.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default StudentsForm;

// <LuPencil className="content_icon" />
