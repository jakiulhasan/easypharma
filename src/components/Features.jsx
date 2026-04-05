import React from "react";
import { ShieldCheck } from "lucide-react";

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

export default Features;
