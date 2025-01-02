import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function CheckSchedule() {
  const [reminders, setReminders] = useState([]); // State to store fetched reminders
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [recordToDelete, setRecordToDelete] = useState(null); // State to store record to delete

  // Fetch reminders on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchReminders();
        setReminders(
          data.map((item) => ({
            key: item.id_reminder, // Unique key for each row
            medicine_name: item.medicine_name, // Assuming this field exists
            reminder_time: item.reminder_time,
            start_date: item.start_date, // Assuming this field exists
            end_date: item.end_date, // Assuming this field exists
            description: item.description, // Assuming this field exists
          }))
        );
      } catch (error) {
        console.error("Failed to fetch reminders:", error);
      }
    }
    fetchData();
  }, []);

  // Fetching function
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
      console.log("Reminders:", data.data); // Use data.data since the backend wraps the response
      return data.data; // Return reminders data
    } catch (error) {
      console.error("Error fetching reminders:", error);
      return [];
    }
  }

  // Function to show delete modal
  const showDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsModalVisible(true);
  };

  // Function to handle delete action
  const handleDelete = async () => {
    try {
      await deleteReminder(recordToDelete.key); // Assuming key is the ID
      setReminders(reminders.filter(item => item.key !== recordToDelete.key)); // Update state
      setIsModalVisible(false); // Close modal
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  // Function to delete reminder from the server
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

  // Table columns
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
            className="btn-sm btn-faint-primary"
            onClick={() => showDeleteModal(record)}
          >
            <DeleteOutlined />
          </Button>
          <Button
            className="btn-sm btn-faint-primary ml-4"
            // onClick={() => showModal("Update", record)}
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  // Render the table
  return (
    <div>
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
    </div>
  );
}

export default CheckSchedule;