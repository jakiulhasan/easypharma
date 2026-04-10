import React, { use } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const GoogleLoginButton = () => {
  const { googleSignIn } = use(AuthContext);

  return (
    <button
      onClick={() => googleSignIn()}
      className="w-full flex items-center justify-center gap-3 bg-white/10 border border-grey/50 font-medium py-3 rounded-xl hover:bg-white/20 hover:scale-[1.02] active:scale-95 transition-all duration-200"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5 h-5 bg-white rounded-full p-0.5"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
