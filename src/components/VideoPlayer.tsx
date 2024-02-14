"use client";
import React, { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume1, VolumeX } from "lucide-react";
import {
  formatTime,
  handleOnTimeUpdate,
  handleVideoProgress,
  handleVideoSpeed,
  handleVolumeChange,
  toggleFullscreen,
  toggleMute,
  togglePlay,
} from "@/helpers/videoPlayer";
import {
  useFullscreen,
  useMuteToggle,
  usePlayPause,
  useSeeking,
  useVolumeControl,
} from "@/hooks/hooks";
import { PlayerState } from "@/types";
const VideoPlayer: React.FC = () => {
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

  usePlayPause({ videoElement, playerState });

  useFullscreen({ videoContainer });

  useVolumeControl({ volume, setVolume, videoElement });

  useSeeking({
    videoElement,
    setPlayerState,
    playerState,
  });

  useMuteToggle(playerState, videoElement);

  const currentTime = videoElement?.current?.currentTime ?? 0;
  
  const duration = videoElement?.current?.duration ?? 0;

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
        src={
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      ></video>
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
    </div>
  );
};

export default VideoPlayer;
