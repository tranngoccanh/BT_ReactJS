import React, { useState } from "react";
import { Button, Form, Input, Modal, DatePicker, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const Popup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    values.avatar = imgstate;
    setIsModalOpen(false);
    try {
      const result = axios({
        url: "https://66179268ed6b8fa434830f0b.mockapi.io/api/students",
        method: "POST",
        data: values,
      });
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [imgstate, setImgState] = useState("");
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleChange = (e) => {
    setImgState(e.target.value);
  };
  const disabledDate = (current) => {
    // Disable future and today's date
    return current && current >= moment().endOf("day");
  };

  return (
    <>
      <Button className="add_students" type="primary" onClick={showModal}>
        ADD NEW STUDENTS
      </Button>
      <Modal
        title="Add New Students"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
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
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Avatar" name="avatar">
            <img src={imgstate}></img>

            <Input
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Item>
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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                min: 6,
                max: 30,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!])[a-zA-Z0-9@!]+$/,
                  message: "Password must be between 6 and 30 characters!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Popup;
