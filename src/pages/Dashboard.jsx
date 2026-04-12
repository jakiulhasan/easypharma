import React, { use, useEffect } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Pill,
  Heart,
  AlertTriangle,
  Settings,
  Plus,
} from "lucide-react";

import { AuthContext } from "../context/auth/AuthContext";
import { Navigate, NavLink, Outlet } from "react-router";

const Dashboard = () => {
  const { user } = use(AuthContext);

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFB] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#053528] text-white p-5 flex flex-col">
        <div className="mb-10 px-2">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Pill className="text-green-400" /> EasyPharma
          </h1>
          <p className="text-[10px] text-green-400 opacity-70">
            Pharmacy Management v1.0
          </p>
        </div>

        <nav className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-green-500 mb-4 px-2 font-bold">
            Main Menu
          </p>

          <NavLink
            to="overview"
            className={
              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 text-green-100 hover:bg-green-800/50"
            }
          >
            {" "}
            <LayoutDashboard></LayoutDashboard>Overview
          </NavLink>
          <NavLink
            to="/dashboard/add-medicine"
            className={
              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 text-green-100 hover:bg-green-800/50"
            }
          >
            {" "}
            <Plus></Plus>Add Medicine
          </NavLink>
          <NavLink
            to="/dashboard/sales"
            className={
              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 text-green-100 hover:bg-green-800/50"
            }
          >
            {" "}
            <ShoppingCart></ShoppingCart>Sales
          </NavLink>
          <NavLink
            to="/inventory"
            className={
              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 text-green-100 hover:bg-green-800/50"
            }
          >
            <Pill></Pill>Inventory
          </NavLink>
          <NavLink
            to="/wishlist"
            className={
              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 text-green-100 hover:bg-green-800/50"
            }
          >
            <Heart></Heart>Wishlist
          </NavLink>
          <NavLink
            to="/expired"
            className={
              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 text-green-100 hover:bg-green-800/50"
            }
          >
            {" "}
            <AlertTriangle></AlertTriangle>Expired
          </NavLink>
          <p className="text-[10px] uppercase tracking-widest text-green-500 mt-8 mb-4 px-2 font-bold">
            Configuration
          </p>
          <NavLink
            to="/settins"
            className={
              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 text-green-100 hover:bg-green-800/50"
            }
          >
            <AlertTriangle></AlertTriangle>Settings
          </NavLink>
        </nav>

        <div className="bg-green-900/50 p-4 rounded-xl flex items-center gap-3 border border-green-800">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-[10px] text-green-300">Online • Pharmacist</p>
          </div>
        </div>
      </aside>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
