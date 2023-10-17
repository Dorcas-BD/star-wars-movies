import React from "react";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <div className="search-title">
        <h2>Search For Movies</h2>
      </div>
      <input type="text" placeholder="Search for a movie" />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
