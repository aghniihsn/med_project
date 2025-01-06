import React from "react";
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
    navigate("/login");
  }

  function handleLogin(){
    navigate("/login")
  }

  return (
    <header>
      <nav className="navbar">
        {userData ? (
          <>
            {/* <h1>ReminderApp</h1> */}
            <Link to="/dashboard">Home</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* <h2>ReminderApp</h2> */}
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
