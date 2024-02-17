"use client";
import { playlist } from "@/constant";
import { SetStateBoolean, Video } from "@/types/types";
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
  showsearchModal: boolean;
  setshowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  showPlaylist:boolean;
  setShowPlayList:SetStateBoolean
}

export const VideoContext = createContext<VideoContextType | undefined>(
  undefined
);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allVideos, setAllVideos] = useState<Video[]>(playlist);
  const [showsearchModal, setshowSearchModal] = useState<boolean>(false);
  const [loading, setIsLoading] = useState(true);
  const [showPlaylist, setShowPlayList] = useState(false);
  const contextValue: VideoContextType = {
    allVideos,
    loading,
    setAllVideos,
    showsearchModal,
    setshowSearchModal,
    showPlaylist,
    setShowPlayList,
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
  }, []);

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
