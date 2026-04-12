import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Overview from "../components/Dashboard/Overview";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
        children: [
          {
            index: true,
            Component: Overview,
          },
        ],
      },
    ],
  },
]);

export default routes;
