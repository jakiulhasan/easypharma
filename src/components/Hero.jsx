import React from "react";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="px-8 py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          Smart Pharmacy Management
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mt-6 leading-tight">
          Next-Gen Solution for{" "}
          <span className="text-emerald-600">Modern Pharmacies</span>
        </h1>
        <p className="text-slate-600 mt-6 text-lg leading-relaxed">
          EasyPharma is a comprehensive MERN-stack ecosystem designed to handle
          complex medicine batches, precise expiry tracking, and lightning-fast
          POS billing. Empowering pharmacists with AI-driven insights.
        </p>
        <div className="mt-10 flex gap-4">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition">
            Start Free Trial
          </button>
          <button className="border-2 border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition">
            Watch Demo
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-white p-4 rounded-3xl shadow-2xl border border-emerald-100 relative z-10">
          <img
            src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000&auto=format&fit=crop"
            alt="Dashboard Preview"
            className="rounded-2xl shadow-inner"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl -z-0"></div>
        <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl -z-0"></div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
