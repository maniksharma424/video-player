import Header from "@/components/Header";
import Playlist from "@/components/Playlist";
import VideoPlayer from "@/components/VideoPlayer";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col px-10">
      <Header />
      <div className="flex-1 w-full flex sm:flex-row flex-col justify-start ">
        <VideoPlayer />
        <Playlist />
      </div>
    </div>
  );
};

export default page;
