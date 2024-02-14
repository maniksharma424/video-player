import { playlist } from "@/constant";
import React from "react";
import VideoCard from "./VideoCard";
import { Video } from "@/providers/videoProvider";

const Playlist: React.FC<{ videos: Video[] }> = ({ videos }) => {
  return (
    <div className="border  flex-1 sm:ml-10 w-full sm:mt-0 mt-5 flex gap-2 flex-col h-[2000px] justify-around">
      {videos.map((item, index) => {
        return <VideoCard  item={item} key={index} />;
      })}
    </div>
  );
};

export default Playlist;
