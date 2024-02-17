import { Video, VideoElementRef } from "@/types/types";
import { useEffect } from "react";

export const useGetSavedProgress = (
  currentVideo: Video | null,
  videoElement: VideoElementRef
) => {
  useEffect(() => {
    const savedProgress = localStorage.getItem(currentVideo!.id);
    if (savedProgress && videoElement.current) {
      videoElement.current.currentTime = parseFloat(savedProgress);
    }
  }, [currentVideo, videoElement]);
};

export const usePutSaveProgress = (
  currentVideo: Video | null,
  videoElement: VideoElementRef
) => {
  useEffect(() => {
    const handleSaveProgress = () => {
      if (videoElement.current) {
        if (
          videoElement.current.duration === videoElement.current.currentTime
        ) {
          localStorage.setItem(currentVideo!.id, "0");
        } else {
          localStorage.setItem(
            currentVideo!.id,
            videoElement.current.currentTime.toString()
          );
        }
      }
    };
    const video = videoElement.current;
    if (video) {
      video.addEventListener("timeupdate", handleSaveProgress);
      return () => {
        video.removeEventListener("timeupdate", handleSaveProgress);
      };
    }
  }, [currentVideo, videoElement]);
};
