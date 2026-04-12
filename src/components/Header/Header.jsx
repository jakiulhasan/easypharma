import React from "react";

import SearchBar from "./SearchBar";

const Header = ({ title }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
          Good Evening
        </p>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <SearchBar></SearchBar>
    </header>
  );
};

export default Header;
