"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Maximize,
  Pause,
  Play,
  SkipForward,
  Volume1,
  VolumeX,
} from "lucide-react";
import {
  formatTime,
  handleOnTimeUpdate,
  handleVideoProgress,
  handleVideoSpeed,
  handleVolumeChange,
  toggleFullscreen,
  toggleMute,
  togglePlay,
} from "@/helpers/videoHelper";
import {
  useAutoPlay,
  useFullscreen,
  useMuteToggle,
  usePlayPause,
  useSeeking,
  useVolumeControl,
} from "@/hooks/hooks";
import { PlayerState, Video, VideoPlayerProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useVideoContext } from "@/providers/videoProvider";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentVideo,
  showControls = true,
  isPlaylistVideo,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  const [volume, setVolume] = useState(1);
  const videoElement = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef(null);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const router = useRouter();
  const {
    allVideos,
  }: {
    allVideos: Video[];
  } = useVideoContext();
  
  useEffect(() => {
    const savedProgress = localStorage.getItem(currentVideo!.id);
    if (savedProgress && videoElement.current) {
      videoElement.current.currentTime = parseFloat(savedProgress);
    }
  }, [currentVideo]);

  useEffect(() => {
    const handleSaveProgress = () => {
      if (videoElement.current) {
        localStorage.setItem(
          currentVideo!.id,
          videoElement.current.currentTime.toString()
        );
      }
    };
    const video = videoElement.current;
    if (video) {
      video.addEventListener("timeupdate", handleSaveProgress);
      return () => {
        handleSaveProgress();
        video.removeEventListener("timeupdate", handleSaveProgress);
      };
    }
  }, [currentVideo]);

  usePlayPause({ videoElement, playerState });

  useFullscreen({ videoContainer });

  useVolumeControl({ volume, setVolume, videoElement });

  useSeeking({
    videoElement,
    setPlayerState,
    playerState,
  });

  useMuteToggle(playerState, videoElement);

  useAutoPlay(isPlaylistVideo, playerState, setPlayerState);

  const currentTime = videoElement?.current?.currentTime ?? 0;

  const duration = videoElement?.current?.duration ?? 0;

  const navigateToNextVideo = () => {
    const currentIndex = allVideos.findIndex(
      (video) => video.id === currentVideo?.id
    );

    if (currentIndex !== -1 && currentIndex < allVideos.length - 1) {
      const nextVideoId = allVideos[currentIndex + 1].id;
      router.push(`/watch/${nextVideoId}`);
    } else {
      router.push(`/watch/${allVideos[0]}`);
    }
  };
  return (
    <div
      ref={videoContainer}
      className="group sm:w-2/3 w-full border h-fit max-w-[1000px] relative"
    >
      <video
        controls={false}
        onClick={() => togglePlay(videoElement, setPlayerState, playerState)}
        onTimeUpdate={() =>
          handleOnTimeUpdate(videoElement, setPlayerState, playerState)
        }
        ref={videoElement}
        src={currentVideo?.sources[0]}
      ></video>
      {showControls && (
        <div
          className={`controls w-full h-fit  custom-control-panel absolute hover:border bottom-0 flex  flex-col justify-between text-white items-center`}
        >
          <input
            className="w-full group-hover:opacity-100 opacity-0"
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) =>
              handleVideoProgress(e, videoElement, setPlayerState, playerState)
            }
          />
          <div
            className={`group-hover:opacity-100 opacity-0 w-full transition-opacity flex items-center justify-around`}
          >
            <button
              onClick={() =>
                togglePlay(videoElement, setPlayerState, playerState)
              }
            >
              {!playerState.isPlaying ? <Play /> : <Pause />}
            </button>
            <button onClick={() => navigateToNextVideo()}>
              {<SkipForward />}
            </button>
            <span>
              {formatTime(currentTime)}/{formatTime(duration)}
            </span>

            <button
              className="mute-btn"
              onClick={() => toggleMute(setPlayerState, playerState)}
            >
              {!playerState.isMuted ? <Volume1 /> : <VolumeX />}
            </button>

            <select
              className="velocity text-black"
              value={playerState.speed}
              onChange={(e) =>
                handleVideoSpeed(
                  e.target.value,
                  videoElement,
                  setPlayerState,
                  playerState
                )
              }
            >
              <option value="0.50">0.50x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="2">2x</option>
            </select>
            <button
              onClick={() =>
                toggleFullscreen(
                  isFullscreenMode,
                  videoContainer,
                  setIsFullscreenMode
                )
              }
            >
              <Maximize />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(e, setVolume, videoElement)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
