import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Row, Col } from "antd";
import { PlusCircleOutlined, ScheduleOutlined, FileTextOutlined } from "@ant-design/icons";

import cookie from '../../core/helpers/cookie';
import useLocalData from '../../core/hook/useLocalData';

const { Header, Content, Footer } = Layout;

function Dashboard() {
  const { store, dispatch } = useLocalData();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  function handleClickAdd(){
    navigate('/add')
  }

  function handleLogout() {
    cookie.del('user');
    dispatch({
      type: 'update',
      value: null,
      name: 'userData',
    });
    navigate("/login");
  }

  function handleClickCheck(){
    navigate('/check-schedule')
  }

  function handleHome(){
    navigate('/dashboard')
  }

  // useEffect(() => {
  //   async function fetchUser() {
  //     const token = JSON.parse(localStorage.getItem('user')).access_token;

  //     try {
  //       const response = await fetch('/user', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`, // Kirim token JWT di header
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //           setUserName(data.data.name); // Ambil nama user dari response
  //         } else {
  //           console.error("Gagal mendapatkan data user:", response.statusText);
  //         }
  //       } catch (err) {
  //         console.error("Error:", err);
  //       }
  //     }

  //     fetchUser();
  //   }, []);

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
          <Menu.Item key="1" onClick={handleHome}>Home</Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
          <Menu.Item key="3" onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "50px", backgroundColor: "#F2F9FF" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 level={2}>Hello, Name</h1>
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

      <Footer style={{ textAlign: "center", backgroundColor:"#FFFFFF" }}>
        ©2024 ReminderApp - Keep Track of Your Medication
      </Footer>
    </Layout>
  );
}

export default Dashboard