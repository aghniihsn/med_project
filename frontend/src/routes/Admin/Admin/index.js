import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, message } from 'antd';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/allUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setUsers(  
          result.data.map((item) => ({  
            key: item.email,  
            ...item
          }))); 
        // message.success('Users fetched successfully');
      } else {
        message.error(result.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Something went wrong while fetching users.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>View {record.name}</a> */}
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
    />
  );
};

export default Admin;
