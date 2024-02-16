import { playlist } from "@/constant";
import React, { useState } from "react";
import VideoCard from "./VideoCard";
import { Video } from "@/types/types";
import { Command, Search } from "lucide-react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Video[]>([]);
  const handleSearch = (e: any) => {
    const searchTerm = e.target.value;
    const filtered = playlist.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchText(searchTerm);
    setSearchResult(filtered);
  };

  return (
    <div className="flex justify-start sm:w-1/3 pl-10">
      <div className=" flex justify-between items-center    w-1/2 border h-7 hover:text-black p-1 px-2 rounded-md border-gray-200 shadow-sm font-[300] text-[14px] cursor-pointer text-gray-500 ">
        {/* <input
          className=" w-[160px] border h-7 text-black p-1 px-2 rounded-md border-gray-200 shadow-sm font-[300] text-[14px]"
          value={searchText}
          placeholder="Search videos..."
          onChange={(e) => handleSearch(e)}
        ></input> */}
        <span className="text-[14px] leading-8 ">Search videos...</span>
        <div className=" bg-gray-100 border  border-gray-200 rounded-md sm:flex hidden justify-start items-center py-[2px] px-[4px]  ">
          <Command className="h-2 w-3 " />
          <span className="text-[10px]">K</span>
        </div>
        <div className="sm:hidden block">
          <Search className="w-4 h-4 text-gray-400"/>
        </div>
      </div>

      <div className="absolute w-32 h-fit flex flex-col">
        {searchResult.length > 0 &&
          searchText.length > 0 &&
          searchResult?.map((item) => {
            return <VideoCard key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default SearchBar;
