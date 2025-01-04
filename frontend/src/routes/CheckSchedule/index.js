import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Table, Modal, Layout, Menu } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


import cookie from '../../core/helpers/cookie';
import useLocalData from '../../core/hook/useLocalData';

const { Header, Content, Footer } = Layout;

function CheckSchedule() {
  const [reminders, setReminders] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [recordToDelete, setRecordToDelete] = useState(null); 
  const { store, dispatch } = useLocalData();
  const navigate = useNavigate();


  async function fetchReminders() {
    try {
      const response = await fetch("http://127.0.0.1:5000/reminder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reminders");
      }

      const data = await response.json();
      console.log("Reminders:", data.data); 
      return data.data;
    } catch (error) {
      console.error("Error fetching reminders:", error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchReminders();
        setReminders(
          data.map((item) => ({
            key: item.id_reminder,
            medicine_name: item.medicine_name,
            reminder_time: item.reminder_time,
            start_date: item.start_date,
            end_date: item.end_date,
            description: item.description,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch reminders:", error);
      }
    }
    fetchData();
  }, []);

  const showDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteReminder(recordToDelete.key); 
      setReminders(reminders.filter(item => item.key !== recordToDelete.key)); 
      setIsModalVisible(false); 
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  async function deleteReminder(id) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reminder/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete reminder");
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
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

  function handleHome(){
    navigate('/dashboard')
  }

  const columns = [
    {
      title: "Drug Name",
      dataIndex: "medicine_name",
      key: "medicine_name",
    },
    {
      title: "Reminder Time",
      dataIndex: "reminder_time",
      key: "reminder_time",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
          color="danger"
          variant="dashed"
          className="mr-4"
            // className="btn-sm btn-faint-primary"
            onClick={() => showDeleteModal(record)}
          >
            <DeleteOutlined />
          </Button>
          <Button
          color="primary"
          variant="dashed"
            // className="btn-sm btn-faint-primary ml-4"
            // onClick={() => showModal("Update", record)}
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Header
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
      </Header> */}

      <Content style={{ padding: "50px", backgroundColor: "#F2F9FF" }}>
      <h1 className="title">Jadwal Minum Obat</h1>
      <Table columns={columns} dataSource={reminders} />
      {/* <Button htmlType="button" className="justify-align-end" onClick={handleHome}>
        Back
      </Button> */}
      <Modal
        title="Ingatkan kembali"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Ya"
        cancelText="Batal"
      >
        <p>Anda akan diingatkan kembali besok, yakin untuk melanjutkan?</p>
      </Modal>
      </Content>

      {/* <Footer style={{ textAlign: "center", backgroundColor:"#FFFFFF" }}>
        ©2024 ReminderApp - Keep Track of Your Medication
      </Footer> */}
    </Layout>
  );
}

export default CheckSchedule;