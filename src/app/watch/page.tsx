"use client";
import Header from "@/components/Header";

import VideoCard from "@/components/VideoCard";

import { useVideoContext } from "@/providers/videoProvider";
import { Video } from "@/types/types";

import React from "react";

const Page = () => {
  const { allVideos }: { allVideos: Video[] } = useVideoContext();

  return (
    <div className="w-full h-screen flex flex-col px-10">
      <Header />
      <div className="flex-1 w-full flex sm:flex-row flex-col justify-start ">
        {allVideos.map((item, index) => {
          return (
            <div key={index}>
              <VideoCard item={item} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
