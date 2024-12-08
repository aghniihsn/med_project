import React from "react";
import { Layout, Menu, Row, Col, Typography } from "antd";
import {
  PlusCircleOutlined,
  ScheduleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
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
      <Content style={{ padding: "50px", backgroundColor: "#f9f9f9" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <Title level={2}>Hello, name!</Title>
          <Text>
            Jangan khawatir soal waktu, cukup atur jadwalmu dan biarkan kami
            mengingatkanmu!
          </Text>
        </div>

        {/* Features */}
        <Row gutter={[32, 32]} justify="center">
          {/* Add Reminder */}
          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div>
              <PlusCircleOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <Title level={4}>Add Reminder</Title>
              <Text>Tambah pengingat baru, biar nggak lupa!</Text>
            </div>
          </Col>

          {/* Check Schedule */}
          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div>
              <ScheduleOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <Title level={4}>Check Schedule</Title>
              <Text>Cek jadwal obatmu!</Text>
            </div>
          </Col>

          {/* Records */}
          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div>
              <FileTextOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <Title level={4}>Records</Title>
              <Text>Lihat history minum obat!</Text>
            </div>
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        ©2024 ReminderApp - Keep Track of Your Medication
      </Footer>
    </Layout>
  );
}
