import React from "react";


import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
