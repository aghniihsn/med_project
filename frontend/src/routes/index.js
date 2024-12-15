import React from "react";
import { Routes as BaseRoutes, Route, Navigate} from "react-router-dom";
import Layout from "../components/Layout";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Add_Reminder from "./Add_Reminder";

export default function Routes() {
    return (
        <BaseRoutes>
          <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to="/login"/>} />
            <Route
              path="/login"
              element={
                  <Login />
              }
            />
            <Route
              path="/register"
              element={
                  <Register />
              }
            />
            <Route
              path="/dashboard"
              element={
                  <Dashboard />
                }
             />
             <Route
              path="/add"
              element={
                  <Add_Reminder />
                }
             />
          </Route>  
        </BaseRoutes>
      );
}
