import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Layout } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const { Content } = Layout;

function CheckSchedule() {
  const navigate = useNavigate()
  const [reminders, setReminders] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [recordToDelete, setRecordToDelete] = useState(null); 

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
            onClick={() => showDeleteModal(record)}
          >
            <DeleteOutlined />
          </Button>
          <Button
          color="primary"
          variant="dashed"
            className="btn-sm btn-faint-primary ml-4"
            // onClick={(navigate('/update'))}
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px", backgroundColor: "#F2F9FF" }}>
      <h1 className="title">Jadwal Minum Obat</h1>
      <Table columns={columns} dataSource={reminders} />
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
    </Layout>
  );
}

export default CheckSchedule;