"use client";
import Header from "@/components/Header";
import Playlist from "@/components/Playlist";
import VideoPlayer from "@/components/VideoPlayer";
import { playlist } from "@/constant";
import { useVideoPlayerContext } from "@/providers/videoPlayerProvider";

import { Video } from "@/types/types";

export default function Page({ params }: { params: { slug: string } }) {
  const currentVideo: Video | null =
    playlist.find((item) => item.id === params.slug) ?? null;

  return (
    <div className="w-full h-screen flex flex-col px-10">
      <Header />
      <div className="flex-1 w-full mt-2 flex sm:flex-row flex-col justify-start ">
        <div className="sm:w-2/3  w-full">
          <VideoPlayer isPlaylistVideo currentVideo={currentVideo} />
          <p className="text-[20px] font-[500] leading-8 ">
            {currentVideo?.title}
          </p>
          <p className="text-[16px] font-[400] text-gray-400 leading-8 ">
            {currentVideo?.description}
          </p>
        </div>
        <div className="sm:h-full h-fit overflow-y-auto sm:w-1/3 w-full">
          <Playlist videoId={params.slug} />
        </div>
      </div>
    </div>
  );
}
