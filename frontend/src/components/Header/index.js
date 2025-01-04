import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalData from "../../core/hook/useLocalData";
import cookie from "../../core/helpers/cookie";

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

  return (
    <header>
      <nav className="navbar">
        {userData ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
