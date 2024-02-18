import VideoCard from "@/components/VideoCard";
import { useVideoContext } from "@/providers/videoProvider";
import { SetStateBoolean, Video } from "@/types/types";
import { X } from "lucide-react";
import React from "react";

const ResponsivePlaylist: React.FC<{
  currentVideoId: string;
  setShowPlayList: SetStateBoolean;
}> = ({ currentVideoId, setShowPlayList }) => {
  const {
    allVideos,
  }: {
    allVideos: Video[];
    setAllVideos: React.Dispatch<React.SetStateAction<Video[]>>;
    loading: boolean;
  } = useVideoContext();

  return (
    <div className="h-screen w-full top-0 left-0 px-2 py-4 flex  flex-col justify-start  absolute bg-white z-[100000] ">
      <div className=" w-full h-fit flex justify-center items-center relative mb-4 text-[20px] font-[500] text-gray-800">
        <X
          className=" absolute left-0 bottom-1"
          onClick={() => {
            setShowPlayList(false);
          }}
        />
        Playlist
      </div>
      {allVideos.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`my-2 ${currentVideoId === item.id && "hidden"}`}
          >
            <div className="flex items-center  rounded-lg max-h-32">
              <VideoCard item={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResponsivePlaylist;
