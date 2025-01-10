import React from "react";  
import { Form, Input, Button, DatePicker, TimePicker, Row, Col, Layout } from "antd";  
import { useNavigate } from 'react-router-dom';  
import moment from "moment";  
import cookie from '../../../core/helpers/cookie';  
import "./style.css";  
  
const { TextArea } = Input;  
const { Content } = Layout;  
  
function Update() {  
    const navigate = useNavigate();  
    const [form] = Form.useForm();  
  
    async function onFinish(values) {    
        console.log(values);    
          
        const userCookie = cookie.get('user');   
        console.log("User Cookie:", userCookie); 
  
        if (!userCookie) {    
            alert("User not found. Please log in again.");    
            return;    
        }    
  
        let user;  
        try {  
            user = JSON.parse(userCookie);  
        } catch (error) {  
            console.error("Error parsing user cookie:", error);  
            alert("Failed to retrieve user information. Please log in again.");  
            return;  
        }  
  
        console.log("Parsed User:", user); 
        const userId = user.user.id;  
        console.log("User ID:", userId); 
  
        const payload = {    
            medicine_name: values.medicine_name,    
            dosage: values.dosage,    
            frequency: values.frequency,    
            start_date: values.start_date[0].format("YYYY-MM-DD"),    
            end_date: values.start_date[1].format("YYYY-MM-DD"),    
            reminder_time: values.reminder_time.format("HH:mm:ss"),    
            description: values.description,    
            status: "active",    
            user_id: userId  // Ensure this is set correctly  
        };    
  
        try {    
            const response = await fetch('http://localhost:5000/reminder', {    
                method: 'POST',    
                headers: {    
                    'Content-Type': 'application/json',    
                },    
                body: JSON.stringify(payload),    
            });    
  
            if (!response.ok) {    
                throw new Error(`HTTP error! Status: ${response.status}`);    
            }    
  
            const data = await response.json();    
            console.log("Response:", data);    
            alert("Reminder berhasil disimpan!");    
            navigate('/check-schedule');     
        } catch (error) {    
            console.error("Error:", error);    
            alert("Gagal menyimpan reminder.");    
        }    
    }    
  
    const disabledDate = (current, selectedDates) => {  
        if (!selectedDates || selectedDates.length === 0) {  
            return current && current < moment().startOf("day");  
        }  
    };  
  
    function cancelBtn() {  
        navigate('/dashboard');  
    }  
  
    return (  
        <Layout style={{ minHeight: "100vh" }}>  
            <Content style={{ backgroundColor: "#F2F9FF" }}>  
                <div className="add-reminder-container">  
                    <h1 className="title">Atur Jadwal Minum Obat</h1>  
                    <Form layout="vertical" onFinish={onFinish} form={form} className="form-container">  
                        <Row gutter={16}>  
                            <Col span={12}>  
                                <Form.Item  
                                    label="Drug Name"  
                                    name="medicine_name"  
                                    rules={[{ required: true, message: "Please enter the drug name" }]}  
                                >  
                                    <Input placeholder="Drug Name" />  
                                </Form.Item>  
  
                                <Form.Item  
                                    label="Dosage"  
                                    name="dosage"  
                                    rules={[{ required: true, message: "Please enter the dosage" }]}  
                                >  
                                    <Input placeholder="Dosage" />  
                                </Form.Item>  
  
                                <Form.Item  
                                    label="Description of Use"  
                                    name="description"  
                                    rules={[{ required: true, message: "Please enter the description" }]}  
                                >  
                                    <TextArea placeholder="Description of Use" rows={4} />  
                                </Form.Item>  
                            </Col>  
  
                            <Col span={12}>  
                                <Form.Item  
                                    label="Frequency"  
                                    name="frequency"  
                                    rules={[{ required: true, message: "Please enter the frequency" }]}  
                                >  
                                    <Input placeholder="3 times a day" />  
                                </Form.Item>  
  
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
                                    <DatePicker.RangePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} disabledDate={(current) => disabledDate(current, form.getFieldValue("start_date"))} />  
                                </Form.Item>  
                            </Col>  
                        </Row>  
  
                        <Form.Item className="button-group">  
                            <Button type="primary" htmlType="submit">  
                                Save  
                            </Button>  
                            <Button htmlType="button" color="primary" variant="outlined" onClick={cancelBtn}>  
                                Cancel  
                            </Button>  
                        </Form.Item>  
                    </Form>  
                </div>  
            </Content>  
        </Layout>  
    );  
}  
  
export default Update;  
