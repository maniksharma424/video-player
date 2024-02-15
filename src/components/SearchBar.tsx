import { playlist } from "@/constant";
import React, { useState } from "react";
import VideoCard from "./VideoCard";
import { Video } from "@/types/types";

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
    <div className="relative ">
      <input
        className="w-30 border h-10 text-black"
        value={searchText}
        onChange={(e) => handleSearch(e)}
      ></input>
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
