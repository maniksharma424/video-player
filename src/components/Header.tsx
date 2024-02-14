import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="w-full h-20 flex  py-2 justify-between items-center">
      <p>VideoPLayer Heading</p>
      <SearchBar />
    </div>
  );
};

export default Header;
