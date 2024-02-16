"use client";
import {
  Check,
  Maximize,
  Pause,
  Play,
  Settings,
  SkipForward,
  Volume1,
  VolumeX,
} from "lucide-react";

import { useAutoPlay } from "@/hooks/hooks";
import { VideoPlayerProps } from "@/types/types";
import { formatTime } from "@/helpers/index";
import { useVideoPlayerContext } from "@/providers/videoPlayerProvider";
import { PLAYBACK_SPEED } from "@/constant";
import { useEffect, useRef } from "react";
import Image from "next/image";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentVideo,
  showControls = true,
  isPlaylistVideo,
}) => {
  const {
    playerState,
    setPlayerState,
    volume,
    setVolume,
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
    showVolumeRange,
    setShowVolumeRange,
    showPlaybackSpeed,
    setShowPlaybackSpeed,
  } = useVideoPlayerContext();

  useAutoPlay(isPlaylistVideo, playerState, setPlayerState, videoElement);
  const playbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (playbackRef.current && !playbackRef.current.contains(event.target)) {
        setShowPlaybackSpeed(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [playbackRef, setShowPlaybackSpeed]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(currentVideo!.id);
    if (savedProgress && videoElement.current) {
      videoElement.current.currentTime = parseFloat(savedProgress);
    }
  }, [currentVideo, videoElement]);

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
        video.removeEventListener("timeupdate", handleSaveProgress);
      };
    }
  }, [currentVideo, videoElement]);
  return (
    <div
      ref={videoContainer}
      className={`group w-full  h-fit max-w-[1000px] relative`}
    >
      <video
        controls={false}
        onClick={() => togglePlay()}
        onTimeUpdate={() => handleOnTimeUpdate()}
        ref={videoElement}
        src={currentVideo?.sources[0]}
        className={`rounded-md  
           w-full h-full
        `}
      ></video>

      {showControls && (
        <div
          className={`controls pb-2 w-full h-fit  custom-control-panel absolute  rounded-b-md bottom-0 flex  flex-col justify-between text-white items-center backdrop-blur-sm`}
        >
          <input
            className={`w-[calc(95%)] ${
              playerState.isPlaying && "group-hover:opacity-100 opacity-0"
            }   accent-red-500`}
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <div
            className={`${
              playerState.isPlaying && "group-hover:opacity-100 opacity-0"
            } w-[calc(95%)] transition-opacity flex mt-2 items-center justify-between`}
          >
            <div className="flex justify-start items-center gap-8">
              <button onClick={() => togglePlay()}>
                {!playerState.isPlaying ? (
                  <Play fill="white" />
                ) : (
                  <Pause fill="white" />
                )}
              </button>
              <button>{<SkipForward fill="white" />}</button>
              <span>
                {formatTime(currentTime)}/{formatTime(duration)}
              </span>

              <button
                onMouseOver={() => setShowVolumeRange(true)}
                onMouseLeave={() => setShowVolumeRange(false)}
                className="mute-btn flex justify-start items-center gap-3"
                onClick={() => toggleMute()}
              >
                {!playerState.isMuted ? (
                  <Volume1 fill="white" />
                ) : (
                  <VolumeX fill="white" />
                )}
                {showVolumeRange && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(e)}
                  />
                )}
              </button>
            </div>
            <div className="flex justify-end items-center gap-8">
              <div
                className="relative cursor-pointer"
                onClick={() => setShowPlaybackSpeed((n) => !n)}
              >
                <Settings />
                {showPlaybackSpeed && (
                  <div
                    ref={playbackRef}
                    className="velocity absolute min-w-fit h-fit p-3 bottom-12 right-[-20px] bg-black/70 rounded-md shadow-sm text-white"
                  >
                    <p className="border-b border-b-gray-100 pb-2">
                      PlaybackSpeed
                    </p>
                    {PLAYBACK_SPEED.map((speed) => (
                      <p
                        key={speed.value}
                        onClick={(e) => handleVideoSpeed(speed.value)}
                        className="mt-2 flex items-center justify-between"
                      >
                        {speed.label}{" "}
                        {playerState.speed.toString() === speed.value && (
                          <Check />
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => toggleFullscreen()}>
                <Maximize />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
