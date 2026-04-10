import React from "react";
import { Beaker } from "lucide-react";

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 px-8">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
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

export default Footer;
