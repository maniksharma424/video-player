"use client";

import { PlayerState, Video, VideoPlayerContextType } from "@/types/types";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useVideoContext } from "./videoProvider";
import { useRouter } from "next/navigation";
import {
  useFullscreen,
  useMuteToggle,
  usePlayPause,
  useSeeking,
  useVolumeControl,
} from "@/hooks/hooks";

export const VideoPlayerContext = createContext<
  VideoPlayerContextType | undefined
>(undefined);

export const VideoPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });
  const [volume, setVolume] = useState(1);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [showVolumeRange, setShowVolumeRange] = useState(false);
  const [showPlaybackSpeed, setShowPlaybackSpeed] = useState(false);

  const videoElement = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentTime = videoElement?.current?.currentTime ?? 0;

  const duration = videoElement?.current?.duration ?? 0;

  const {
    allVideos,
  }: {
    allVideos: Video[];
  } = useVideoContext();

  const navigateToNextVideo = () => {
    // const currentIndex = allVideos.findIndex(
    //   (video) => video.id === currentVideo?.id
    // );
    // if (currentIndex === allVideos.length - 1) {
    //   router.push(`/watch${allVideos[0].id}`);
    // }
    // else if (currentIndex != -1) {
    //   router.push(`/watch/${allVideos[currentIndex + 1].id}`);
    // }
  };

  const togglePlay = (): void => {
    if (videoElement.current) {
      if (videoElement.current.paused || videoElement.current.ended) {
        videoElement.current.play();
      } else {
        videoElement.current.pause();
      }
      setPlayerState({
        ...playerState,
        isPlaying: !videoElement.current.paused,
      });
    }
  };

  const toggleFullscreen = (): void => {
    if (!isFullscreenMode) {
      videoContainer?.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreenMode(!isFullscreenMode);
  };

  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoElement.current) {
      videoElement.current.volume = newVolume;
    }
  };

  const handleOnTimeUpdate = (): void => {
    if (videoElement.current) {
      const progress =
        (videoElement?.current?.currentTime / videoElement.current.duration) *
        100;
      setPlayerState({
        ...playerState,
        progress,
      });
    }
  };

  const handleVideoProgress = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const manualChange = Number(event.target.value);
    if (videoElement.current) {
      videoElement.current.currentTime =
        (videoElement.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
      });
    }
  };

  const handleVideoSpeed = (playBackspeed: string): void => {
    const speed = Number(playBackspeed);
    if (videoElement.current) {
      videoElement.current.playbackRate = speed;
      setPlayerState({
        ...playerState,
        speed,
      });
    }
  };

  const toggleMute = (): void => {
    if (!playerState.isMuted) {
      setVolume(0);
    }
    if (playerState.isMuted) {
      setVolume(1);
    }
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  const seek = (seconds: number): void => {
    if (videoElement.current) {
      const newTime = videoElement.current.currentTime + seconds;
      videoElement.current.currentTime = Math.max(
        0,
        Math.min(newTime, videoElement.current.duration)
      );
      const progress =
        (videoElement.current.currentTime / videoElement.current.duration) *
        100;
      setPlayerState({
        ...playerState,
        progress,
      });
    }
  };



  usePlayPause({ videoElement, playerState });

  useFullscreen({ videoContainer });

  useVolumeControl({ volume, setVolume, videoElement });

  useSeeking({
    videoElement,
    setPlayerState,
    playerState,
    seek,
    togglePlay,
  });
  useMuteToggle(playerState, videoElement);

  const contextValue = {
    playerState,
    setPlayerState,
    volume,
    setVolume,
    isFullscreenMode,
    setIsFullscreenMode,
    videoElement,
    videoContainer,
    currentTime,
    duration,
    navigateToNextVideo,
    togglePlay,
    toggleFullscreen,
    handleVolumeChange,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    seek,
    showVolumeRange,
    setShowVolumeRange,
    showPlaybackSpeed,
    setShowPlaybackSpeed,
  };

  return (
    <VideoPlayerContext.Provider value={contextValue}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayerContext = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
