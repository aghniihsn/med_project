import React, { useEffect, useMemo, useState } from "react";
import { Badge, Button, List, notification, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import { Link, useNavigate } from "react-router-dom";

import useLocalData from "../../core/hook/useLocalData";
import cookie from "../../core/helpers/cookie";
import "./style.css";

function Header() {
  const { store, dispatch } = useLocalData();
  const userData = store.userData;
  const navigate = useNavigate()
  const [notif, setNotif] = useState()

  function handleLogout() {
    cookie.del('user');
    dispatch({
      type: 'update',
      value: null,
      name: 'userData',
    });
    alert('apakah anda yakin untuk logout?')
    navigate("/login");
  }

  function handleLogin() {
    navigate("/login")
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = () => {
    api.info({
      message: 'Reminder',
      description:store.notification,
    });
  };

  const getNotificationList = async () => {
    const userId = cookie.get("user")?.id; 
    if (!userId) return; 
    const response = await fetch(`http://localhost:5000/notification/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setNotif(result);
  };
  

  const cookieUser = cookie.get("user");
  // useEffect(() => {
  //   if (cookieUser && !userData) {
  //     dispatch({
  //       type: "update",
  //       name: "userData",
  //       value: JSON.parse(cookieUser),
  //     });
  //   }
  // }, [cookieUser]);

  useMemo(() => {
    getNotificationList()
  }, [cookieUser])

  useEffect(() => {
    if (store.notification) openNotificationWithIcon()
  }, [store.notification])
  return (
    <header>
      {contextHolder}
      <nav className="navbar">
        <img src="image/logoapp.jpg" alt="Logo" className="logo" />
        <p>Health Mate</p>
        <div className="nav-links">
          {userData ? (
            <>
              <Popover content={<List
                className="demo-loadmore-list"
                // loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={notif}
                renderItem={(item) => (
                  <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.picture.large} />}
                      title={<a href="https://ant.design">{item.name?.last}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />} title="Title" trigger="click">
                <Badge
                  className="site-badge-count-109"
                  // count={10}
                  style={{ backgroundColor: '#52c41a' }}
                >
                  <Button size="small" shape="circle" icon={<BellOutlined />} />

                </Badge>
              </Popover>
              <Link to="/dashboard">Home</Link>
              <Link to="/profile">Profile</Link>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Login</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
