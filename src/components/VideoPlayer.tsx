"use client";
import {
  useAutoPlay,
  useGetSavedProgress,
  usePutSaveProgress,
  useVideoLoading,
} from "@/hooks/hooks";
import { VideoPlayerProps } from "@/types/types";
import { useVideoPlayerContext } from "@/providers/videoPlayerProvider";
import ControlPannel from "./ControlPannel";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentVideo,
  isPlaylistVideo,
}) => {
  const {
    playerState,
    setPlayerState,
    videoElement,
    videoContainer,
    togglePlay,
    handleOnTimeUpdate,
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
           drop-shadow-md ${isVideoLoaded ? "visible" : "invisible "}
        `}
      ></video>
      <div
        className={`absolute bottom-0 rounded-md bg-white flex justify-center items-center  ${
          isVideoLoaded ? "hidden" : " min-h-full w-full"
        }`}
      >
        <div className="w-10 h-10 border-2  border-black border-t-white animate-spin rounded-full"></div>
      </div>

      {isVideoLoaded && <ControlPannel currentVideo={currentVideo} />}
    </div>
  );
};

export default VideoPlayer;
