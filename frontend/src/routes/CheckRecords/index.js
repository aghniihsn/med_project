import React from "react";
import { Layout, Table } from "antd";
import "./style.css";

const {Content} = Layout
function CheckRecords(){
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      
      return(

        <Content style={{minHeight: "90vh", padding: "50px", backgroundColor: "#F2F9FF" }}>  
        <div className="records">
            <h1>Riwayat Reminder</h1>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
      </Content>
    )
}

export default CheckRecords