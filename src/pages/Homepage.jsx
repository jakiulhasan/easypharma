import React from "react";


import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";

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
