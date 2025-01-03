import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AddReminder from './Add_Reminder';
import CheckSchedule from './CheckSchedule'
import NoMatch from './NoMatch';
import AuthRoute from '../components/AuthRoute';
import GuestRoute from '../components/GuestRoute';

function App(){

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