import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout as BaseLayout, Button, notification } from "antd";
import { io } from 'socket.io-client';
import Header from "../Header";
import Footer from "../Footer";
import useLocalData from "../../core/hook/useLocalData";
import cookie from "../../core/helpers/cookie";

function Layout() {
  const { store, dispatch } = useLocalData();
  const userData = store.userData;
  const location = useLocation()

  
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    })
  }

  // outside of your component, initialize the socket variable
  let socket;

  const cookieUser = cookie.get("user");
  useEffect(() => {
    if (cookieUser && !userData) {
      dispatch({
        type: "update",
        name: "userData",
        value: JSON.parse(cookieUser),
      });
    }
  }, [cookieUser]);

  useEffect(() => {

    // create websocket/connect
    socket = io("http://127.0.0.1:5000");

    // listen for chat events
    socket.on("notification", (chat) => {
      console.log("form notif", chat)
      dispatch({
        type: "update",
        name: "notification",
        value: JSON.parse(cookieUser),
      });
    })

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  if (!userData) {
    return (
      <>
        {
          !["/login", "/register"].includes(location.pathname) && <Header />
        }
        <Outlet />
      </>

    )
  }

  return (
    <BaseLayout style={{ minHeight: "100vh" }}>
      <BaseLayout className="site-layout">
        <Header />
        {contextHolder}
        <BaseLayout.Content className="site-content-layout">
          <Outlet />
        </BaseLayout.Content>
        <Footer />
      </BaseLayout>
    </BaseLayout>
  );
}

export default Layout;
