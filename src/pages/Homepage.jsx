import React from "react";
import { motion } from "framer-motion";
import { Beaker, ShieldCheck, LayoutDashboard } from "lucide-react";

const Navbar = () => (
  <nav className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-50">
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
    <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
      Get Started
    </button>
  </nav>
);

const Hero = () => (
  <section className="px-8 py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all group">
    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
      <Icon className="h-6 w-6 text-emerald-600 group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Features = () => (
  <section className="px-8 py-24 max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-slate-900">Why EasyPharma?</h2>
      <p className="text-slate-500 mt-4">
        Built for scale, speed, and accuracy.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard
        icon={ShieldCheck}
        title="Batch & Expiry Tracking"
        desc="Advanced FIFO/FEFO logic to ensure zero-waste and safe medicine dispensing with automated alerts."
      />
      <FeatureCard
        icon={ShieldCheck}
        title="Smart POS System"
        desc="Barcode integrated billing with multiple payment methods and instant PDF invoice generation."
      />
      <FeatureCard
        icon={ShieldCheck}
        title="Supplier Management"
        desc="Track purchase history, manage dues, and keep your inventory replenished with ease."
      />
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 px-8">
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <Beaker className="h-6 w-6 text-emerald-500" />
          <span className="text-2xl font-bold text-white tracking-tight">
            Easy<span className="text-emerald-500">Pharma</span>
          </span>
        </div>
        <p className="max-w-sm">
          A premium management solution tailored for pharmacies in Bangladesh.
          Managing medicine, batches, and sales has never been easier.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Platform</h4>
        <ul className="space-y-4 text-sm">
          <li>Inventory Control</li>
          <li>POS Billing</li>
          <li>Reporting</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-sm">
          <li>About Us</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </div>
    <div className="text-center pt-8 text-sm italic">
      &copy; {new Date().getFullYear()} EasyPharma. Developed with ❤️ by MERN
      Experts.
    </div>
  </footer>
);

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
