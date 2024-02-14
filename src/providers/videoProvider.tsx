"use client";
import { playlist } from "@/constant";
import { Video } from "@/types/types";
import React, { createContext, useState, ReactNode, useContext } from "react";




export interface VideoContextType {
  allVideos: Video[];
  currentVideo: Video | null;
  updateCurrentVideo: (video: Video | null) => void;
}

export const VideoContext = createContext<VideoContextType | undefined>(
  undefined
);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allVideos, setAllVideos] = useState<Video[]>(playlist);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(playlist[0]);

  const updateCurrentVideo = (video: Video | null) => {
    setCurrentVideo(video);
  };

  const contextValue: VideoContextType = {
    allVideos,
    currentVideo,
    updateCurrentVideo,
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
