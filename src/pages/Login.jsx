import React, { use } from "react";

import { AuthContext } from "../context/auth/AuthContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import EmailLoginForm from "../components/auth/EmailLoginForm";
import AuthFooter from "../components/auth/AuthFooter";
import { Navigate } from "react-router";
import Loading from "../components/Loading/Loading";

const Login = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="backdrop-blur-xl bg-white/30 border border-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 💊
        </h2>

        {/* Google Login (Recommended) */}
        <GoogleLoginButton />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Email Login */}
        <EmailLoginForm />

        {/* Footer */}
        <AuthFooter />
      </div>
    </div>
  );
};

export default Login;
