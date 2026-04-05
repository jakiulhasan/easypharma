import React from "react";
import { Beaker } from "lucide-react";
import { Link } from "react-router";
const Navbar = () => (
  <nav className=" px-8 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-50">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="bg-emerald-600 p-2 rounded-lg">
          <Beaker className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">
          Easy<span className="text-emerald-600">Pharma</span>
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-slate-600 font-medium">
        <a href="#" className="hover:text-emerald-600 transition">
          Features
        </a>
        <a href="#" className="hover:text-emerald-600 transition">
          Analytics
        </a>
        <a href="#" className="hover:text-emerald-600 transition">
          Inventory
        </a>
      </div>
      <div className="gap-2 flex">
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 cursor-pointer">
          Get Started
        </button>
        <Link
          to="/login"
          className="bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-700 transition shadow-lg shadow-emerald-200 cursor-pointer"
        >
          Login
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
