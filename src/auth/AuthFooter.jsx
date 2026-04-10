import React from "react";
import { Link } from "react-router";

const AuthFooter = () => {
  return (
    <p className="text-center text-sm text-gray-600 mt-6">
      No account?{" "}
      <Link
        to="/register"
        className="text-blue-500 font-medium hover:underline"
      >
        Register
      </Link>
    </p>
  );
};

export default AuthFooter;
