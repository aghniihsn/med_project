import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

export default function Register() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#FDF7F4",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "300px",
        }}
      >
        <Title level={2}>Welcome!</Title>

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%", maxWidth: "350px" }}
        >
        <Form.Item
            label="Name"
            name="name"
        >
            <Input placeholder="Restu Agis" />
        </Form.Item>

        <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="no_telp"
        >
            <Input placeholder="0815262718191" />
        </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginBottom: "16px", backgroundColor: "#997C70" }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <p style={{ marginTop: "16px" }}>
          Ohh you have an account? <a href="/login">Sign in</a>
        </p>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          minWidth: "300px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="image/medicine.gif"
            alt="reminder"
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <p>Set your Time to take your medication on Time!</p>
        </div>
      </div>
    </div>
  );
}
