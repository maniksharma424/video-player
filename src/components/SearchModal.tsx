import { playlist } from "@/constant";
import { Video } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import SearchCard from "./SearchCard";
import { Search } from "lucide-react";
import SearchResultNotFound from "./SearchResultNotFound";
import StartSearching from "./StartSearching";
import useClickOutside from "@/hooks/useClickOutside";


const SearchModal: React.FC<{
  setshowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setshowSearchModal }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Video[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const filtered = playlist.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchText(searchTerm);
    setSearchResult(filtered);
  };

  useEffect(() => {
    const escapeKeyListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setshowSearchModal(false);
      }
    };
    document.addEventListener("keydown", escapeKeyListener);
    return () => {
      document.removeEventListener("keydown", escapeKeyListener);
    };
  }, []);
  const modalRef = useRef(null);
  useClickOutside(modalRef, setshowSearchModal);
  return (
    <div className="fixed left-0 top-0 z-[500] flex h-screen w-full items-center justify-center shadow-modal  backdrop-blur ">
      <div className="absolute h-screen w-full bg-[#0C111D] opacity-[0.7] bg-blend-overlay "></div>
      <div
        ref={modalRef}
        className="lg:w-1/3 sm:3/5 w-4/5 sm:h-2/3 h-1/3 bg-white z-[600] rounded-md flex flex-col sm:p-8 p-5 relative"
      >
        <input
          className="w-full border h-9 text-black p-1 px-2 rounded-md  focus:outline-none border-gray-200 shadow-sm font-[300] text-[14px]"
          value={searchText}
          placeholder="Search videos..."
          onChange={handleSearch}
        ></input>
        <div className="relative">

        <span className="absolute  bottom-[6px] right-2 w-fit  text-[10px] py-[2px] px-1 bg-gray-100 text-gray-400 rounded-sm shadow-sm font-[400] border">
          ESC
        </span>
        </div>
        <div className="mt-5 h-full overflow-auto">
          {searchText === "" ? (
            <div className="text-gray-500 flex w-full h-full items-center justify-center ">
              <StartSearching />
            </div>
          ) : searchResult.length === 0 ? (
            <div className="text-gray-500 flex w-full h-full items-center justify-center ">
              <SearchResultNotFound />
            </div>
          ) : (
            <div className="w-full h-fit rounded-md overflow-scroll flex flex-col gap-2">
              {searchResult?.map((item) => (
                <SearchCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
