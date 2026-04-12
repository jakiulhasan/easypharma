import React, { use } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Pill,
  Heart,
  AlertTriangle,
  PlusCircle,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  MinusCircle,
} from "lucide-react";
import { AuthContext } from "../context/auth/AuthContext";
import { Navigate } from "react-router";

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg mb-1 ${active ? "bg-green-800 text-white shadow-lg" : "text-green-100 hover:bg-green-800/50"}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

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

const Dashboard = () => {
  const { user, signOutUser } = use(AuthContext);
  console.log(user);

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
          <SidebarItem icon={LayoutDashboard} label="Overview" active />
          <SidebarItem icon={ShoppingCart} label="Sales" />
          <SidebarItem icon={Pill} label="Inventory" />
          <SidebarItem icon={Heart} label="Wishlist" />
          <SidebarItem icon={AlertTriangle} label="Expired" />

          <p className="text-[10px] uppercase tracking-widest text-green-500 mt-8 mb-4 px-2 font-bold">
            Configuration
          </p>
          <SidebarItem icon={Settings} label="Settings" />
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
              Good Evening
            </p>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search medicines..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 ring-green-500/20 w-64"
              />
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-200 text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <button
              onClick={() => signOutUser()}
              className="bg-[#053528] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </header>

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
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-all group">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <PlusCircle size={24} />
                </div>
                <p className="font-bold text-sm">Add Medicine</p>
                <p className="text-[10px] text-gray-400">Restock inventory</p>
              </div>
              {/* Sell Medicine */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-all group">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <MinusCircle size={24} />
                </div>
                <p className="font-bold text-sm">Sell Medicine</p>
                <p className="text-[10px] text-gray-400">Manage Inventory</p>
              </div>
              {/* Wishlist */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Heart size={24} />
                </div>
                <p className="font-bold text-sm">View Wishlist</p>
                <p className="text-[10px] text-gray-400">Customer requests</p>
              </div>
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
    </div>
  );
};

export default Dashboard;
