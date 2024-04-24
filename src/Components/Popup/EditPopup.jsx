import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, DatePicker, Upload } from "antd";
import { LuPencil } from "react-icons/lu";
import axios from "axios";
import moment from "moment";

const Popup = (props) => {
  const { userId, date } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null); // Lưu thông tin người dùng
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Gọi API hoặc local storage để lấy thông tin người dùng khi userId thay đổi
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://66179268ed6b8fa434830f0b.mockapi.io/api/students/${userId}`
        );
        if (response.status === 429) {
          window.alert("Quá tải ");
          setIsModalOpen(false);
        } else {
          setUserData(response.data);
        }
      } catch (error) {
        window.alert("Quá tải ");
        setIsModalOpen(false);
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  console.log(date);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://66179268ed6b8fa434830f0b.mockapi.io/api/students/${userId}`
        );
        let data1 = response.data;
        console.log("122412", response);
        if (response.status === 429) {
          window.alert("Quá tải ");
          setIsModalOpen(false);
        } else {
          setUserData(response.data);

          form.setFieldsValue({
            name: data1.name || "",
            email: data1.email || "",
            phone: data1.phone || "",
            enroll: data1.enroll || "",
            createdAt: data1.createdAt,
            password: data1.password || "",
            confirmPassword: data1.password || "",
          });
        }
      } catch (error) {
        window.alert("Quá tải ");
        setIsModalOpen(false);
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [date]);
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const result = await axios({
        url: `https://66179268ed6b8fa434830f0b.mockapi.io/api/students/${userId}`,
        method: "PUT",
        data: values,
      });
      window.location.reload();
      console.log("Updated user:", result.data);
      handleOk(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [idUser, setIdUser] = useState("");
  let userDetail = "";
  const readUserDetail = async () => {
    userDetail = await localStorage.getItem("profile");
    userDetail = await JSON.parse(userDetail);

    setIdUser(userDetail.id);
  };
  console.log(idUser);
  useEffect(() => {
    readUserDetail();
  }, []);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const renderPassword = () => {
    console.log(userDetail, "53235");
    console.log(userId, "32525");
    return idUser === userId ? (
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    ) : (
      <p></p>
    );
  };

  return (
    <>
      <LuPencil
        className="edit_students"
        type="primary"
        onClick={showModal}
        style={{ color: "#FEAF00", width: "18px", height: "18px" }}
      />

      {userData && ( // Kiểm tra xem dữ liệu người dùng đã được tải lên chưa
        <Modal
          title="Edit Students"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              enrollNumber: userData.enrollNumber,
              birthday: moment(userData.birthday),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  min: 4,
                  max: 50,
                  message: "Name must be between 4 and 50 characters!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  min: 6,
                  max: 30,
                  message: "Email must be between 6 and 30 characters!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 30,
                  message: "Phone number must be between 6 and 30 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enroll Number"
              name="enroll"
              rules={[
                {
                  required: true,
                  min: 8,
                  max: 100,
                  message: "Enroll number must be between 8 and 100 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "Please input your birthday!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value.isBefore(moment(), "day")) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Birthday must be in the past!");
                  },
                }),
              ]}
            >
              <DatePicker />
            </Form.Item>

            {renderPassword()}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Popup;
