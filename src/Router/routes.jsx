import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Overview from "../components/Dashboard/Overview";
import Sales from "../components/Dashboard/sales/Sales";
import AddMedicine from "../components/Dashboard/Add-Medicine/AddMedicine";
import Wishlist from "../components/Dashboard/Wishlist/Wishlist";
import Expired from "../components/Dashboard/Expired/Expired";
import Settings from "../components/Dashboard/Settings/Settings";
import InventoryView from "../components/Dashboard/Inventory/InventoryView";

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
            element: <Navigate to="overview"></Navigate>,
          },
          {
            path: "overview",
            Component: Overview,
          },
          {
            path: "sales",
            Component: Sales,
          },
          {
            path: "add-medicine",
            Component: AddMedicine,
          },
          {
            path: "inventory",
            Component: InventoryView,
          },
          {
            path: "wishlist",
            Component: Wishlist,
          },
          {
            path: "near-expired",
            Component: Expired,
          },
          {
            path: "settings",
            Component: Settings,
          },
        ],
      },
    ],
  },
]);

export default routes;
