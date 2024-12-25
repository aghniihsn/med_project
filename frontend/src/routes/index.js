import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AddReminder from './Add_Reminder';
import NoMatch from './NoMatch';
import cookie from '../core/helpers/cookie';
import useLocalData from '../core/hook/useLocalData';
import CheckShedule from './CheckSchedule';
import { AuthRoute } from '../components/AuthRoute';

  let isRequestingAuth = false;

  export default function App() {
    const { dispatch } = useLocalData();
    const navigate = useNavigate();

    const location = useLocation();
    
    async function checkingLoggedIn() {
      const userData = cookie.get('user');
    
      try {
        if (userData && !isRequestingAuth) {
          isRequestingAuth = true;
    
          const response = await fetch('/user-by-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: JSON.parse(userData).access_token,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            isRequestingAuth = false;
              cookie.set("user", JSON.stringify(data));
              dispatch({
              type: 'update',
              value: data,
              name: 'userData',
            });
            navigate(location.pathname || "/");
          } else {
            cookie.del('user');
            dispatch({
              type: 'update',
              value: null,
              name: 'userData',
            });
            navigate("/login");
            isRequestingAuth = false;
          }
        }
      } catch (err) {
        console.error("Error saat checkingLoggedIn:", err);
        isRequestingAuth = false;
      }
    }
    
    useEffect(() => {
      checkingLoggedIn();
    }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<Loading />}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <React.Suspense fallback={<Loading />}>
              <Register />
            </React.Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
            <React.Suspense fallback={<Loading />}>
              <Dashboard />
            </React.Suspense>
            </AuthRoute>
          }
        />
        <Route
          path="/add"
          element={
            <AuthRoute>
            <React.Suspense fallback={<Loading />}>
              <AddReminder />
            </React.Suspense>
            </AuthRoute>
          }
        />
        <Route
          path="/check-schedule"
          element={
            <AuthRoute>
            <React.Suspense fallback={<Loading />}>
              <CheckShedule/>
            </React.Suspense>
            </AuthRoute>
          }
        />
        <Route path="/*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}