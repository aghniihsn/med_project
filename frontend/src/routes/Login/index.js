import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Link } = Typography;

function Login() {
  const navigate = useNavigate
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/dashboard")
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
        <Title level={2}>Welcome back</Title>
        <p>Please enter your details</p>

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%", maxWidth: "350px" }}
        >
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
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Link>Forgot password</Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginBottom: "16px", backgroundColor: "#997C70" }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <p style={{ marginTop: "16px" }}>
          Don’t have an account? <a href="/register">Sign up</a>
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

export default Login