import React, { useEffect, useState } from "react";

import { Command, Search } from "lucide-react";
import SearchModal from "./SearchModal";
import { useVideoContext } from "@/providers/videoProvider";

const SearchBar = () => {
  const { showsearchModal, setshowSearchModal } = useVideoContext();

  return (
    <div className="flex justify-start sm:w-1/3 flex-1 pl-1 sm:pl-12">
      <div
        onClick={() => {
          setshowSearchModal((n) => !n);
        }}
        className=" flex justify-between items-center  w-full border h-9 hover:text-black p-1 px-2 rounded-md border-gray-200 shadow-sm font-[300] text-[14px] cursor-pointer text-gray-500 "
      >
        <span className="text-[14px] leading-8 ">Search videos</span>
        <div className=" bg-gray-100 border  border-gray-200 rounded-md sm:flex hidden justify-start items-center py-[2px] px-[4px]  ">
          <Command className="h-2 w-3 " />
          <span className="text-[10px]">K</span>
        </div>
        <div className="sm:hidden block">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {showsearchModal && (
        <SearchModal setshowSearchModal={setshowSearchModal} />
      )}
    </div>
  );
};

export default SearchBar;
