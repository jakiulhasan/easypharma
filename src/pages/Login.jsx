import React, { use } from "react";
import GoogleLoginButton from "../auth/GoogleLoginButton";
import EmailLoginForm from "../auth/EmailLoginForm";
import AuthFooter from "../auth/AuthFooter";
import { AuthContext } from "../context/auth/AuthContext";

const Login = () => {
  const { user } = use(AuthContext);

  console.log("user is :", user);
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
