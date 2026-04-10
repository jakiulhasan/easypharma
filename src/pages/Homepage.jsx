import React, { use } from "react";

import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import { AuthContext } from "../context/auth/AuthContext";
import { Navigate } from "react-router";
import Loading from "../components/Loading/Loading";

export default function HomePage() {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
