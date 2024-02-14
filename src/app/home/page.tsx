"use client";
import Header from "@/components/Header";

import VideoCard from "@/components/VideoCard";

import { Video, useVideoContext } from "@/providers/videoProvider";

import React from "react";

const Page = () => {
  const { allVideos }: { allVideos: Video[] } = useVideoContext();

  return (
    <div className="w-full h-screen flex flex-col px-10">
      <Header />
      <div className="flex-1 w-full flex sm:flex-row flex-col justify-start ">
        {allVideos.map((item, index) => {
          return <VideoCard item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Page;
