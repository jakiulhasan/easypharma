import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8fafc] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60"></div>

      {/* Main Glass Card */}
      <div className="relative z-10 backdrop-blur-2xl bg-white/40 border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] w-full max-w-md mx-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
            Easy<span className="text-blue-600">Pharma</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Create your pharmacy account
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
