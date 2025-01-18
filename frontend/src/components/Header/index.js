import React, { useEffect } from "react";
import { Button, notification } from 'antd';
import { Link, useNavigate } from "react-router-dom";

import useLocalData from "../../core/hook/useLocalData";
import cookie from "../../core/helpers/cookie";
import "./style.css";

function Header() {
  const { store, dispatch } = useLocalData();
  const userData = store.userData;
  const navigate = useNavigate()

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

  function handleLogin(){
    navigate("/login")
  }

  useEffect(() => {
    console.log(store)
  }, [store])
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <header>
      <nav className="navbar">
      <img src="image/logoapp.jpg" alt="Logo" className="logo" />
      <p>Health Mate</p>
      <div className="nav-links">
        {userData ? (
          <>
            <Link to="/dashboard">Home</Link>
            <Link to="/profile">Profile</Link>
            {contextHolder}
            <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
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
