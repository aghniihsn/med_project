import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { EditOutlined,DeleteOutlined } from "@ant-design/icons";


function CheckSchedule() {
  const [reminders, setReminders] = useState([]); // State to store fetched reminders

  // Fetch reminders on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchReminders();
        setReminders(
          data.map((item) => ({
            key: item.id_reminder, // Unique key for each row
            reminder_time: item.reminder_time,
            status: item.status,
            address: "Default Address", // Replace or fetch actual address if available
            tags: ["active", "medicine"], // Replace or generate actual tags
            name: `Medicine ${item.id_medicine}`, // Example name based on medicine ID
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
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_,record) => (
        <div>
        <Button
        className="btn-sm btn-faint-primary"
        type=""
        // onClick={() => showModal("Delete", record)}
        >
        <DeleteOutlined />
        </Button>
        <Button
        className="btn-sm btn-faint-primary ml-4"
        type=""
        // onClick={() => showModal("Update", record)}
        >
        <EditOutlined />
        </Button>
        </div>
      ),
    },
  ];
  
  // const showModal = (type, record) => {
  //   // let tempModalData = {
  //   //   content: <NewEmployee afterSubmit={() => afterSubmitUser()} />,
  //   //   title: "Karyawan",
  //   //   visible: true,
  //   //   onCancel: () => {
  //   //     setModalData({ visible: false });
  //   //   }
  //   // };

  //   if (type === "Delete") {
  //     tempModalData.content = <ImportEmployee data={record} afterSubmit={() => afterSubmitUser()} />;
  //     tempModalData.title = "Import Karyawan";
  //   }
  //   if (type === "Update") {
  //     tempModalData.content = <ImportEmployee data={record} afterSubmit={() => afterSubmitUser()} />;
  //     tempModalData.title = "Import Karyawan";
  //   }
  // }

  // Render the table
  return <Table columns={columns} dataSource={reminders} />;
}

export default CheckSchedule;
