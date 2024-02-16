"use client";
import Header from "@/components/Header";
import Playlist from "@/components/Playlist";
import VideoPlayer from "@/components/VideoPlayer";
import { playlist } from "@/constant";

import { Video } from "@/types/types";
import { CircleUserRound } from "lucide-react";

export default function Page({ params }: { params: { slug: string } }) {
  const currentVideo: Video | null =
    playlist.find((item) => item.id === params.slug) ?? null;

  return (
    <div className="w-full h-screen flex flex-col sm:px-10 px-5">
      <Header />
      <div className="flex-1 w-full  mt-2 flex sm:flex-row flex-col justify-start ">
        <div className="sm:w-2/3  w-full">
          <VideoPlayer isPlaylistVideo currentVideo={currentVideo} />
          <p className="text-[20px] font-[500] leading-8 mt-5 ">
            {currentVideo?.title}
          </p>
          <div className="flex  items-center justify-start ">
            <CircleUserRound />
            <span className="text-[16px] font-[400]  leading-8 ml-2">
              {currentVideo?.subtitle}
            </span>
          </div>
          <p className="text-[14px] font-[400] text-gray-400 leading-8 ">
            {currentVideo?.description}
          </p>
        </div>
        <div className="sm:h-[calc(100%-52px)] h-fit  sm:fixed sm:mt-0 mt-5 right-0 sm:w-1/3 w-full sm:overflow-auto  sm:pl-10">
          <Playlist currentVideoId={params.slug} />
        </div>
      </div>
    </div>
  );
}
