"use client";
import {
  Check,
  Maximize,
  Pause,
  Play,
  RotateCcw,
  Settings,
  SkipForward,
  Volume1,
  VolumeX,
} from "lucide-react";
import {
  useAutoPlay,
  useGetSavedProgress,
  usePutSaveProgress,
  useVideoLoading,
} from "@/hooks/hooks";
import { VideoPlayerProps } from "@/types/types";
import { formatTime } from "@/helpers/index";
import { useVideoPlayerContext } from "@/providers/videoPlayerProvider";
import { PLAYBACK_SPEED } from "@/constant";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentVideo,
  isPlaylistVideo,
}) => {
  const {
    playerState,
    setPlayerState,
    volume,
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
    playbackRef,
    isVideoLoaded,
    setIsVideoLoaded,
  } = useVideoPlayerContext();

  useAutoPlay(isPlaylistVideo, playerState, setPlayerState, videoElement);

  useGetSavedProgress(currentVideo, videoElement);

  usePutSaveProgress(currentVideo, videoElement);

  useVideoLoading(setIsVideoLoaded, videoElement, currentVideo);

  return (
    <div
      ref={videoContainer}
      className={`group w-full  h-fit max-w-[1000px] relative`}
    >
      <video
        playsInline
        controls={false}
        onClick={() => togglePlay()}
        onTimeUpdate={() => handleOnTimeUpdate()}
        ref={videoElement}
        src={currentVideo?.sources[0]}
        className={`rounded-md  w-full h-full
           drop-shadow-md ${isVideoLoaded ? "visible  " : "invisible "}
        `}
      ></video>
      <div
        className={`absolute bottom-0 rounded-md bg-black flex justify-center items-center  ${ 
          isVideoLoaded ? "hidden" : "h-full w-full"
        }`}
      >
        <div className="w-10 h-10 border-2  border-red-500 border-t-white animate-spin rounded-full"></div>
      </div>

      {isVideoLoaded && (
        <div
          className={`controls ${
            playerState.isPlaying && "group-hover:opacity-100 opacity-0"
          } pb-2 w-full h-fit  custom-control-panel absolute  rounded-b-md bottom-0 flex  flex-col justify-between text-white items-center backdrop-blur-sm  bg-black/10`}
        >
          <input
            className={`w-[calc(95%)]    accent-red-500`}
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <div
            className={` w-[calc(95%)] transition-opacity flex mt-2 items-center justify-between`}
          >
            <div className="flex justify-start items-center sm:gap-8 gap-2">
              <button onClick={() => togglePlay()}>
                {formatTime(currentTime) === formatTime(duration) ? (
                  <RotateCcw />
                ) : !playerState.isPlaying ? (
                  <Play fill="white" />
                ) : (
                  <Pause fill="white" />
                )}
              </button>
              <button
                onClick={() => {
                  navigateToNextVideo(currentVideo?.id);
                }}
              >
                {<SkipForward fill="white" />}
              </button>
              <span>
                {formatTime(currentTime)}/{formatTime(duration)}
              </span>

              <button
                onMouseOver={() => setShowVolumeRange(true)}
                onMouseLeave={() => setShowVolumeRange(false)}
                className="mute-btn flex justify-start items-center sm:gap-3 gap-1"
              >
                {!playerState.isMuted ? (
                  <Volume1 onClick={() => toggleMute()} fill="white" />
                ) : (
                  <VolumeX onClick={() => toggleMute()} fill="white" />
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
            <div className="flex justify-end items-center sm:gap-8 gap-2">
              <div className="relative cursor-pointer">
                <Settings
                  onClick={(e) => {
                    setShowPlaybackSpeed((n) => !n);
                  }}
                />
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
