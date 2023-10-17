import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="header">
      <SearchBar />
      <img src="./starWar.png" alt="Star Warlogo" />
      <ul className="header-ul">
        <li>Subscribe</li>
        <li>Login</li>
      </ul>
    </div>
  );
};

export default Header;
