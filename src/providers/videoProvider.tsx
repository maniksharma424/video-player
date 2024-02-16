"use client";
import { playlist } from "@/constant";
import { Video } from "@/types/types";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export interface VideoContextType {
  allVideos: Video[];
  loading: boolean;
  setAllVideos: React.Dispatch<React.SetStateAction<Video[]>>;
}

export const VideoContext = createContext<VideoContextType | undefined>(
  undefined
);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allVideos, setAllVideos] = useState<Video[]>(playlist);
  const [loading, setIsLoading] = useState(true);

  const contextValue: VideoContextType = {
    allVideos,
    loading,
    setAllVideos,
  };

  useEffect(() => {
    const getSavedVideoOrder = () => {
      const savedOrder = localStorage.getItem("videoOrder");
      return savedOrder ? JSON.parse(savedOrder) : null;
    };

    const savedVideoOrder = getSavedVideoOrder();

    if (savedVideoOrder) {
      const reorderedVideos = savedVideoOrder.map((id: string) =>
        allVideos.find((video) => video.id === id)
      );
      setAllVideos(reorderedVideos);
    }
    setIsLoading(false);
  },[]);
 

  

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
