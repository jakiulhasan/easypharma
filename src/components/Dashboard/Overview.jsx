import React from "react";
import {
  PlusCircle,
  LogOut,
  Search,
  Bell,
  User,
  MinusCircle,
  LayoutDashboard,
  ShoppingCart,
  Pill,
  Heart,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { AuthContext } from "../../context/auth/AuthContext";
import Header from "../Header/Header";
import { Link } from "react-router";

const StatCard = ({ title, value, color, icon: Icon, subText }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between h-32">
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-semibold">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div
        className={`p-2 rounded-lg bg-gray-50 ${color.replace("bg-", "text-")}`}
      >
        <Icon size={22} />
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-2">{subText}</p>
  </div>
);

const Overview = () => {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <Header title="Dashboard Overview"></Header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Todays Sale"
            value="৳ 12,450"
            color="bg-blue-500"
            icon={ShoppingCart}
            subText="Live • Updated 2m ago"
          />
          <StatCard
            title="Monthly Sale"
            value="৳ 3,85,000"
            color="bg-purple-500"
            icon={LayoutDashboard}
            subText="↑ 12% from last month"
          />
          <StatCard
            title="Todays Profit"
            value="৳ 2,100"
            color="bg-orange-500"
            icon={PlusCircle}
            subText="Calculated from net cost"
          />
          <StatCard
            title="Monthly Profit"
            value="৳ 64,200"
            color="bg-green-500"
            icon={Heart}
            subText="Target: ৳ 75,000"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Near Expire Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={20} /> Near Expire
              </h3>
              <span className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold">
                5 ITEMS
              </span>
            </div>

            <div className="space-y-4">
              {[
                { name: "Napa Extend", date: "12 May 2026", stock: "12 pcs" },
                { name: "Sergel 20mg", date: "28 May 2026", stock: "05 pcs" },
                { name: "Fenadin 120", date: "02 Jun 2026", stock: "20 pcs" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all"
                >
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-[11px] text-gray-400">
                      Expires: {item.date}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    {item.stock}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-semibold text-green-700 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              View All Expiring
            </button>
          </div>

          {/* Quick Actions & Wishlist */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              {/* Add Medicine */}
              <Link
                to="/dashboard/sales"
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-all group"
              >
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <PlusCircle size={24} />
                </div>
                <p className="font-bold text-sm">Add Medicine</p>
                <p className="text-[10px] text-gray-400">Restock inventory</p>
              </Link>
              {/* Sell Medicine */}
              <Link
                to="/dashboard/sales"
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-all group"
              >
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <MinusCircle size={24} />
                </div>
                <p className="font-bold text-sm">Sell Medicine</p>
                <p className="text-[10px] text-gray-400">Manage Inventory</p>
              </Link>
              {/* Wishlist */}
              <Link
                to="/dashboard/wishlist"
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Heart size={24} />
                </div>
                <p className="font-bold text-sm">View Wishlist</p>
                <p className="text-[10px] text-gray-400">Customer requests</p>
              </Link>
            </div>

            {/* Medicine Wishlist / Recent Activity Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Heart className="text-pink-500" size={20} /> Medicine Wishlist
              </h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] text-gray-400 uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-3">Medicine Name</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    {
                      name: "Insulin Pen",
                      user: "Akash Vijay",
                      status: "Priority",
                    },
                    {
                      name: "Ventolin Inhaler",
                      user: "Ashna Hamdaz",
                      status: "Normal",
                    },
                    {
                      name: "Ceevit 250mg",
                      user: "Mr. Gupta",
                      status: "Ordered",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="group">
                      <td className="py-4 text-sm font-bold text-gray-700">
                        {row.name}
                      </td>
                      <td className="py-4 text-xs text-gray-500">{row.user}</td>
                      <td className="py-4 text-right">
                        <span
                          className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                            row.status === "Priority"
                              ? "bg-orange-50 text-orange-600"
                              : row.status === "Ordered"
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-50 text-gray-500"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Overview;
