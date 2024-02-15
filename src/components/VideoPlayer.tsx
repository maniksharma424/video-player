"use client";
import {
  Maximize,
  Pause,
  Play,
  SkipForward,
  Volume1,
  VolumeX,
} from "lucide-react";

import { useAutoPlay } from "@/hooks/hooks";
import { VideoPlayerProps } from "@/types/types";
import { formatTime } from "@/helpers/index";
import { useVideoPlayerContext } from "@/providers/videoPlayerProvider";

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
  } = useVideoPlayerContext();

  useAutoPlay(isPlaylistVideo, playerState, setPlayerState);

  return (
    <div
      ref={videoContainer}
      className="group sm:w-2/3 w-full border h-fit max-w-[1000px] relative"
    >
      <video
        controls={false}
        onClick={() => togglePlay()}
        onTimeUpdate={() => handleOnTimeUpdate()}
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
            onChange={(e) => handleVideoProgress(e)}
          />
          <div
            className={`group-hover:opacity-100 opacity-0 w-full transition-opacity flex items-center justify-around`}
          >
            <button onClick={() => togglePlay()}>
              {!playerState.isPlaying ? <Play /> : <Pause />}
            </button>
            <button onClick={() => navigateToNextVideo()}>
              {<SkipForward />}
            </button>
            <span>
              {formatTime(currentTime)}/{formatTime(duration)}
            </span>

            <button className="mute-btn" onClick={() => toggleMute()}>
              {!playerState.isMuted ? <Volume1 /> : <VolumeX />}
            </button>

            <select
              className="velocity text-black"
              value={playerState.speed}
              onChange={(e) => handleVideoSpeed(e.target.value)}
            >
              <option value="0.50">0.50x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="2">2x</option>
            </select>
            <button onClick={() => toggleFullscreen()}>
              <Maximize />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
