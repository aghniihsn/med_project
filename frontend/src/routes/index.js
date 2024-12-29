import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AddReminder from './Add_Reminder';
import CheckSchedule from './CheckSchedule'
import NoMatch from './NoMatch';
import cookie from '../core/helpers/cookie';
import useLocalData from '../core/hook/useLocalData';
import AuthRoute from '../components/AuthRoute';
import GuestRoute from '../components/GuestRoute';

let isRequestingAuth = false;

function App() {
    const { dispatch } = useLocalData();
    const navigate = useNavigate();
    const location = useLocation();

    // async function checkingLoggedIn() {
    //     const userData = cookie.get('user');
    //     console.log("User Data:", userData);

    //     try {
    //         if (userData && !isRequestingAuth) {
    //             isRequestingAuth = true;

    //             const response = await fetch('/user-by-token', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     token: JSON.parse(userData).access_token, // Pastikan ini benar
    //                 }),
    //             });

    //             console.log("Response Status:", response.status);

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log("User Data from API:", data);
    //                 isRequestingAuth = false;
    //                 cookie.set("user", JSON.stringify(data));
    //                 dispatch({
    //                     type: 'update',
    //                     value: data,
    //                     name: 'userData',
    //                 });
    //                 navigate(location.pathname || "/dashboard");
    //             } else {
    //                 console.error("Failed to authenticate, redirecting to login.");
    //                 cookie.del('user');
    //                 dispatch({
    //                     type: 'update',
    //                     value: null,
    //                     name: 'userData',
    //                 });
    //                 navigate("/login");
    //                 isRequestingAuth = false;
    //             }
    //         }
    //     } catch (err) {
    //         console.error("Error saat checkingLoggedIn:", err);
    //         isRequestingAuth = false;
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
                        <GuestRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Login />
                            </React.Suspense>
                        </GuestRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <React.Suspense fallback={<Loading />}>
                                <Register />
                            </React.Suspense>
                        </GuestRoute>
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
                                <CheckSchedule />
                            </React.Suspense>
                        </AuthRoute>
                    }
                />
                <Route path="/*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

export default App