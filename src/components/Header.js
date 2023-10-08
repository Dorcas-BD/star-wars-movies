import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="header">
      <SearchBar />
      <img src="./starWar.png" alt="Star Warlogo" />
    </div>
  );
};

export default Header;
