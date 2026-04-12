import React, { use } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import {
  PlusCircle,
  LogOut,
  Bell,
  User,
  MinusCircle,
  LayoutDashboard,
  ShoppingCart,
  Pill,
  Heart,
  AlertTriangle,
  Settings,
  Search
} from "lucide-react";

const SearchBar = () => {
  const { signOutUser } = use(AuthContext);
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
  );
};

export default SearchBar;
