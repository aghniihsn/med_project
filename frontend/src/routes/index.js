import React from "react";
import { Routes as BaseRoutes, Route, Navigate} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Login";

export default function Routes() {
    return (
        <BaseRoutes>
          <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to="/home"/>} />
            <Route
              path="/home"
              element={
                  <Home />
              }
            />
          </Route>  
        </BaseRoutes>
      );
}
