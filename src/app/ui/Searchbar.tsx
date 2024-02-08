import React from "react";

const Searchbar = () => {
  return (
    <input
      type="text"
      placeholder="Search"
      name="search"
      className="px-3 py-2 rounded-md bg-mainBg outline:none focus:outline-none"
    />
  );
};

export default Searchbar;
