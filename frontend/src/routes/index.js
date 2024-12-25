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

export default function App() {
  const { dispatch } = useLocalData();
  const navigate = useNavigate();
  const location = useLocation();

//   async function checkingLoggedIn() {
//     const token = localStorage.getItem('access_token');
//     console.log("Access Token from LocalStorage:", token);

//     try {
//         if (token) {
//           const response = await fetch('http://127.0.0.1:5000/user-by-token', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           });          

//             console.log("Token Validation Response:", response);

//             if (response.ok) {
//                 const result = await response.json();
//                 console.log("Token Validation Result:", result);
//                 dispatch({
//                     type: 'update',
//                     value: result.data,
//                     name: 'userData',
//                 });
//                 navigate(location.pathname || '/');
//             } else {
//                 throw new Error('Session expired or invalid token');
//             }
//         } else {
//             console.log("No token found. Redirecting to login.");
//             navigate('/login');
//         }
//     } catch (error) {
//         console.error('Authentication error:', error);
//         localStorage.removeItem('access_token');
//         dispatch({
//             type: 'update',
//             value: null,
//             name: 'userData',
//         });
//         navigate('/login');
//     }
// }

// useEffect(() => {
//     checkingLoggedIn();
// }, []);



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
            <React.Suspense fallback={<Loading />}>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route
          path="/add"
          element={
            <React.Suspense fallback={<Loading />}>
              <AddReminder />
            </React.Suspense>
          }
        />
        <Route
          path="/check-schedule"
          element={
            <React.Suspense fallback={<Loading />}>
              <CheckShedule/>
            </React.Suspense>
          }
        />
        <Route path="/*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
