import { useEffect } from "react";
import {
  PlayerState,
  VideoElementRef,
  Video,
} from "../types/types";

export const useMuteToggle = (
  playerState: PlayerState,
  videoElement: VideoElementRef
) => {
  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.muted = playerState.isMuted;
    }
  }, [playerState.isMuted, videoElement]);
};
export const useAutoPlay = (
  playerState: PlayerState,
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
  videoElement: VideoElementRef
) => {
  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.play().then((res) => {
        setPlayerState({
          ...playerState,
          isPlaying: !videoElement?.current?.paused,
        });
      });
    }
  }, [videoElement.current]);
};

export const useVideoLoading = (
  setIsVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  videoElement: VideoElementRef,
  currentVideo: Video | null
) => {
  useEffect(() => {
    setIsVideoLoaded(false);
    const handleVideoLoading = () => {
      //setTimeout(() => {
      setIsVideoLoaded(true);
      //}, 200);
    };
    if (videoElement.current) {
      videoElement.current.addEventListener(
        "canplaythrough",
        handleVideoLoading
      );
    }
    const video = videoElement.current;
    return () => {
      video?.removeEventListener("canplaythrough", handleVideoLoading);
    };
  }, [videoElement, setIsVideoLoaded, currentVideo]);
};

export const usePlayback = (
  navigateToNextVideo: (id: string | undefined) => void,
  currentVideo: Video | null,
  videoElement: VideoElementRef
) => {
  useEffect(() => {
    const handleNextVideo = () => {
      setTimeout(() => {
        navigateToNextVideo(currentVideo?.id);
      }, 1200);
    };
    videoElement.current?.addEventListener("ended", handleNextVideo);
    const video = videoElement.current;
    return () => {
      video?.removeEventListener("ended", handleNextVideo);
    };
  }, []);
};
