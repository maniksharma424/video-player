import React from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Link from "next/link";
import { useVideoContext } from "@/providers/videoProvider";
import { SetStateBoolean } from "@/types/types";
import Playlist from "@/components/Playlist";
import ResponsivePlaylist from "./ResponsivePlaylist";
import GithubIcon from "./GithubIcon";
import Logo2 from "./Logo2";
import { BookOpen, BookPlus } from "lucide-react";

const Header: React.FC<{ slug: string }> = ({ slug }) => {
  const {
    showPlaylist,
    setShowPlayList,
  }: { showPlaylist: boolean; setShowPlayList: SetStateBoolean } =
    useVideoContext();
  return (
    <div className="w-full h-fit flex  py-2 justify-between items-center border-b border-b-gray-100">
      <div className="sm:flex hidden sm:w-2/3 justify-start items-baseline ">
        <Link
          href={"/watch"}
          className=" cursor-pointer flex justify-start items-baseline"
        >
          <Logo />
          <p className="font-[500] text-[16px] ml-2 leading-8">Caste</p>
        </Link>

        <ul className="sm:flex hidden  ml-5   justify-start items-center leading-8 gap-2 text-[14px] font-[300] text-gray-500">
          <Link href={"/blog"}>Blog</Link>
          <Link
            aria-label="Github repository for the project"
            href={"https://github.com/maniksharma424/video-player"}
          >
            Github
          </Link>
        </ul>
      </div>
      <div className="flex justify-start items-center  w-fit">
        <div
          onClick={() => setShowPlayList((n) => !n)}
          className="sm:hidden mr-3 "
        >
          <Logo2 />
        </div>
        <Link
          className="sm:hidden block mr-2"
          aria-label="Blog post for videplayer"
          href={"/blog"}
        >
          <BookPlus />
        </Link>
        <Link
          className="sm:hidden block mr-2"
          aria-label="Github repository for the project"
          href={"https://github.com/maniksharma424/video-player"}
        >
          <GithubIcon />
        </Link>
      </div>
      <SearchBar />
      {showPlaylist && (
        <ResponsivePlaylist
          setShowPlayList={setShowPlayList}
          currentVideoId={slug}
        />
      )}
    </div>
  );
};

export default Header;
