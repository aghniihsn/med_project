import React from "react";
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Row, Col } from "antd";
import {
  PlusCircleOutlined,
  ScheduleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function Dashboard() {
  const navigate = useNavigate();

  function handleClickAdd(){
    navigate('/add')
  }

  function handleClickCheck(){
    navigate('/check-schedule')
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
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

      <Content style={{ padding: "50px", backgroundColor: "#f9f9f9" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 level={2}>Hello, name!</h1>
          <p>
            Jangan khawatir soal waktu, cukup atur jadwalmu dan biarkan kami
            mengingatkanmu!
          </p>
        </div>

        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div onClick={handleClickAdd}>
              <PlusCircleOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h2 >Add Reminder</h2>
              <p>Tambah pengingat baru, biar nggak lupa!</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
            <div onClick={handleClickCheck}>
              <ScheduleOutlined
                style={{
                  fontSize: "48px",
                  color: "#69b1ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              />
              <h2>Check Schedule</h2>
              <p>Cek jadwal obatmu!</p>
            </div>
          </Col>

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
              <h2>Records</h2>
              <p>Lihat history minum obat!</p>
            </div>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        ©2024 ReminderApp - Keep Track of Your Medication
      </Footer>
    </Layout>
  );
}
export default Dashboard