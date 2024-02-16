import React from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";


const Header = () => {
  return (
    <div className="w-full h-fit flex  py-2 sm:justify-between justify-start items-center border-b border-b-gray-100">
      <div className="sm:flex hidden sm:w-2/3 justify-start items-baseline ">
        <Logo />
        <p className="font-[500] text-[16px] ml-2 leading-8">Caste</p>

        <ul className="sm:flex hidden  ml-5   justify-start items-center leading-8 gap-2 text-[14px] font-[300] text-gray-500">
          <li>Home</li>
          <li>Portfolio</li>
          <li>Developer</li>
        </ul>
      </div>
      <div className="sm:hidden block mr-3 ">
        <svg
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M3 5H11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 12H16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 19H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
      <SearchBar />
    </div>
  );
};

export default Header;
