import React from "react";
import { Layout, Menu, Typography, Input, Button, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Add_Reminder() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "20px", color: "#333" }}>
          ReminderApp
        </div>
        <Menu mode="horizontal" style={{ borderBottom: "none" }}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
          <Menu.Item key="3">Logout</Menu.Item>
        </Menu>
      </Header>

      {/* Main Content */}
      <Row gutter={[32, 32]}>
      <Col xs={24} sm={12} md={8}>
      <Content style={{ padding: "50px", backgroundColor: "#f9f9f9" }}>
        <div style={{ marginBottom: "50px" }}>
          <Title level={2}>Atur Jadwal Minum Obat</Title>
          
            <Input placeholder="Drug Name" style={{ borderColor: "#ff4d4f", marginBottom: "20px" }} />
            <Input.TextArea
              placeholder="Description of Use"
              rows={4}
              style={{ borderColor: "#ff4d4f", marginBottom: "20px" }}
            />
            <Button type="primary" style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", marginRight: "10px" }}>
                Save
              </Button>
              <Button style={{ borderColor: "#ff4d4f" }}>Cancel</Button>
            
            </div>
      </Content>
      </Col>
     </Row>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        ©2024 ReminderApp - Keep Track of Your Medication
      </Footer>
    </Layout>
  );
}