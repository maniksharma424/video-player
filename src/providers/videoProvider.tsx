"use client";
import { playlist } from "@/constant";
import { Video } from "@/types/types";
import React, { createContext, useState, ReactNode, useContext } from "react";

export interface VideoContextType {
  allVideos: Video[];

  setAllVideos: React.Dispatch<React.SetStateAction<Video[]>>;
}

export const VideoContext = createContext<VideoContextType | undefined>(
  undefined
);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allVideos, setAllVideos] = useState<Video[]>(playlist);

  const contextValue: VideoContextType = {
    allVideos,

    setAllVideos,
  };

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
