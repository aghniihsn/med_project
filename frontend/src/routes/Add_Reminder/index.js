import React from "react";
import { Form, Input, Button, DatePicker, TimePicker, Row, Col, Layout } from "antd";
import { useNavigate } from 'react-router-dom';
import "./style.css";

const { TextArea } = Input;
const { Content, Footer } = Layout;

function AddReminder(){
  const navigate = useNavigate();
  function onFinish(values){
    console.log("Form Values:", values);   
  }

  function cancelBtn(){
    navigate('/dashboard')
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <div className="add-reminder-container">
          <h1 className="title">Atur Jadwal Minum Obat</h1>
          <Form layout="vertical" onFinish={onFinish} className="form-container">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Drug Name"
                  name="drug_name"
                  rules={[{ required: true, message: "Please enter the drug name" }]}
                >
                  <Input placeholder="Drug Name" />
                </Form.Item>
                <Form.Item
                  label="Description of Use"
                  name="medicine_name"
                  rules={[{ required: true, message: "Please enter the description" }]}
                >
                  <TextArea placeholder="Description of Use" rows={4} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Time"
                  name="reminder_time"
                  rules={[{ required: true, message: "Please select time" }]}
                >
                  <TimePicker format={"HH:mm"} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Date Range"
                  name="start_date"
                  rules={[{ required: true, message: "Please select date range" }]}
                >
                  <DatePicker.RangePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="button-group">
              <Button type="primary" htmlType="submit" className="save-button">
                Save
              </Button>
              <Button htmlType="button" className="cancel-button" onClick={cancelBtn}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2024 ReminderApp - Keep Track of Your Medication
      </Footer>
    </Layout>
  );
}
export default AddReminder;
